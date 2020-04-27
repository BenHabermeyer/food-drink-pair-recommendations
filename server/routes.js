// OLD SETUP
//var config = require('./db-config.js');
//var mysql = require('mysql');
//config.connectionLimit = 10;
//var connection = mysql.createPool(config);

// NEW SETUP
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

async function init() {
  try {
    await oracledb.createPool({
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString
      // edition: 'ORA$BASE', // used for Edition Based Redefintion
      // events: false, // whether to handle Oracle Database FAN and RLB events or support CQN
      // externalAuth: false, // whether connections should be established using External Authentication
      // homogeneous: true, // all connections in the pool have the same credentials
      // poolAlias: 'default', // set an alias to allow access to the pool via a name.
      // poolIncrement: 1, // only grow the pool by one connection at a time
      // poolMax: 4, // maximum size of the pool. Increase UV_THREADPOOL_SIZE if you increase poolMax
      // poolMin: 0, // start with no connections; let the pool shrink completely
      // poolPingInterval: 60, // check aliveness of connection if idle in the pool for 60 seconds
      // poolTimeout: 60, // terminate connections that are idle in the pool for 60 seconds
      // queueMax: 500, // don't allow more than 500 unsatisfied getConnection() calls in the pool queue
      // queueTimeout: 60000, // terminate getConnection() calls queued for longer than 60000 milliseconds
      // sessionCallback: myFunction, // function invoked for brand new connections or by a connection tag mismatch
      // stmtCacheSize: 30 // number of statements that are cached in the statement cache of each connection
    });
    console.log("pool created")
  } catch (err) {
    console.error("init() error: " + err.message);
  }
}

init();

//inside of starting app call function to set up connection and use connection

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


//req is input, res is output
//for an input state, find 10 brew/wineries and their best wine/beer, ordered by average review score desc, with best beer/wine
async function getStateDataWine(req, res) {
  var fullname = req.params.stateName;
  var splitname = fullname.split("_");
  var statename = splitname[0];
  var beverage = splitname[1];
    let connection;
    try {
      connection = await oracledb.getConnection();
      if (beverage === 'wine') {
        let result = await connection.execute(
          // The statement to execute
        `WITH 
          avgr AS (
              SELECT DISTINCT r.title AS title, AVG(r.points) AS avgrating
              FROM wine_review r
              GROUP BY r.title
          ),
          bestwine AS (
              SELECT DISTINCT w.winery AS winery, MIN(w.title) AS title
              FROM wine_origin w JOIN avgr ON w.title = avgr.title
              WHERE w.province = :bnbv
              GROUP BY w.winery
              HAVING MAX(avgr.avgrating) >= ALL (
                  SELECT avgr.avgrating
                  FROM wine_origin w2 JOIN avgr ON w2.title = avgr.title
                  WHERE w2.winery = w.winery
              )
          ),
          winery_rating AS (
              SELECT DISTINCT w.winery AS winery, AVG(r.points) AS rating
              FROM wine_origin w JOIN wine_review r ON w.title=r.title 
              WHERE w.province = :bnbv
              GROUP BY w.winery
          )
        SELECT DISTINCT w.winery AS winery, ROUND(r.rating,2) AS rating, b.title AS title
        FROM wine_origin w JOIN bestwine b ON w.winery = b.winery AND w.title=b.title 
            JOIN winery_rating r ON w.winery=r.winery
        WHERE w.province = :bnbv
        ORDER BY ROUND(r.rating,2) DESC`,
        // The "bind value" for the bind variable ":bnbv"
        [statename],
        {
          maxRows: 10,
          outFormat: oracledb.OUT_FORMAT_OBJECT
        });  

        console.log(result.metaData); 
        console.log(result.rows);

        res.json(result.rows) //REALLY IMPORTANT
      } else if (beverage === 'beer') {
        let result = await connection.execute(
          // The statement to execute
        `WITH 
          avgr AS (
              SELECT DISTINCT r.beer_name AS title, AVG(r.rating) AS avgrating
              FROM beer_review r
              GROUP BY r.beer_name
          ),
          bestbeer AS (
              SELECT DISTINCT w.brewery_name AS brewery_name, MIN(w.beer_name) AS title
              FROM beer_origin w JOIN avgr ON w.beer_name = avgr.title
              WHERE w.province = :bnbv
              GROUP BY w.brewery_name
              HAVING MAX(avgr.avgrating) >= ALL (
                  SELECT avgr.avgrating
                  FROM beer_origin w2 JOIN avgr ON w2.beer_name = avgr.title
                  WHERE w2.brewery_name = w.brewery_name
              )
          ),
          brewery_rating AS (
              SELECT DISTINCT w.brewery_name AS brewery_name, AVG(r.rating) AS rating
              FROM beer_origin w JOIN beer_review r ON w.beer_name=r.beer_name 
              WHERE w.province = :bnbv
              GROUP BY w.brewery_name
          )
        SELECT DISTINCT w.brewery_name AS winery, ROUND(r.rating,2) AS rating, b.title AS title
        FROM beer_origin w JOIN bestbeer b ON w.brewery_name = b.brewery_name AND w.beer_name=b.title 
            JOIN brewery_rating r ON w.brewery_name=r.brewery_name
        WHERE w.province = :bnbv
        ORDER BY ROUND(r.rating,2) DESC`,
        // The "bind value" for the bind variable ":bnbv"
        [statename],
        {
          maxRows: 10,
          outFormat: oracledb.OUT_FORMAT_OBJECT
        });  

        console.log(result.metaData); 
        console.log(result.rows);

        res.json(result.rows) //REALLY IMPORTANT  
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.release();
        } catch (e) {
          console.error(e);
        }
      }
    }
}

//req is input, res is output
async function getDrinkPair(req, res) {
  foodname = req.params.foodName;
    let connection;
    try {
      connection = await oracledb.getConnection();
      let result = await connection.execute(
        // The statement to execute
      `WITH wine AS (SELECT p.VARIETY AS TYPE, o.TITLE AS NAME, p.RATING, r.POINTS AS DRINK_RATING
        FROM WINE_ORIGIN o JOIN WINE_PAIR p ON p.VARIETY = o.VARIETY
        JOIN WINE_REVIEW r ON r.TITLE = o.TITLE
        WHERE FOOD = :bnbv),
        beer AS (SELECT p.BEER_STYLE AS TYPE, o.BEER_NAME AS NAME, p.RATING, r.RATING AS DRINK_RATING
        FROM BEER_ORIGIN o JOIN BEER_PAIR p ON p.BEER_STYLE = o.BEER_STYLE
        JOIN BEER_REVIEW r ON r.BEER_NAME = o.BEER_NAME
        WHERE FOOD = :bnbv)
        (SELECT w.TYPE, MAX(w.NAME) AS NAME, w.RATING, w.DRINK_RATING 
        FROM wine w 
        JOIN (SELECT TYPE, MAX(DRINK_RATING) AS BEST FROM wine GROUP BY TYPE) r 
        ON w.TYPE = r.TYPE AND w.DRINK_RATING = r.BEST GROUP BY w.TYPE, w.RATING, w.DRINK_RATING)
        UNION
        (SELECT b.TYPE, MAX(b.NAME) AS NAME, b.RATING, b.DRINK_RATING 
        FROM beer b
        JOIN (SELECT TYPE, MAX(DRINK_RATING) AS BEST FROM beer GROUP BY TYPE) r 
        ON b.TYPE = r.TYPE AND b.DRINK_RATING = r.BEST GROUP BY b.TYPE, b.RATING, b.DRINK_RATING )
        ORDER BY RATING DESC`,
      // The "bind value" for the bind variable ":bnbv"
      [foodname],
      {
        maxRows: 10,
        outFormat: oracledb.OUT_FORMAT_OBJECT
      });

      console.log(result.metaData); 
      console.log(result.rows);

      res.json(result.rows) //REALLY IMPORTANT
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.release();
        } catch (e) {
          console.error(e);
        }
      }
    }
}

//req is input, res is output
async function getFoodPair(req, res) {
  drinktype = req.params.drinkType;
    let connection;
    try {
      connection = await oracledb.getConnection();
      let result = await connection.execute(
        // The statement to execute
        `SELECT DISTINCT FOOD, RATING
        FROM WINE_PAIR WHERE VARIETY = :bnbv
        UNION
        SELECT DISTINCT FOOD, RATING
        FROM BEER_PAIR WHERE BEER_STYLE = :bnbv
        ORDER BY RATING DESC`,
      // The "bind value" for the bind variable ":bnbv"
      [drinktype],
      {
        maxRows: 10,
        outFormat: oracledb.OUT_FORMAT_OBJECT
      });

      console.log(result.metaData); 
      console.log(result.rows);

      res.json(result.rows) //REALLY IMPORTANT
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.release();
        } catch (e) {
          console.error(e);
        }
      }
    }
}

//returns statistics about the state's wine/beer
async function getStateStats(req, res) {
  var statename = req.params.stateName;
    let connection;
    try {
      connection = await oracledb.getConnection();
      let result = await connection.execute(
      // The statement to execute
      `WITH cte1 as (
        SELECT b.beer_style as beer_style, COUNT(*) AS num
        FROM beer_origin b 
        where b.province=:bnbv
        GROUP BY b.beer_style
      ), highbeer as (
        SELECT MIN(cte1.beer_style) as beer_style
        FROM cte1 
        WHERE cte1.num >= ALL (
            SELECT num from cte1)
      ), cte2 as (
        SELECT b.variety as variety, COUNT(*) AS num
        FROM wine_origin b 
        where b.province=:bnbv
        GROUP BY b.variety
      ), highwine as (
        SELECT MIN(cte2.variety) as variety
        FROM cte2
        WHERE cte2.num >= ALL (
            SELECT num from cte2)
      ), aggregates as (
        SELECT COUNT(DISTINCT b.brewery_name) as nbreweries, 
        COUNT(DISTINCT b.beer_name) as nbeers, 
        COUNT(DISTINCT w.winery) as nwineries,
        COUNT(DISTINCT w.title) as nwines
        FROM beer_origin b JOIN wine_origin w ON b.province=w.province
        WHERE b.province=:bnbv
      ) 
      SELECT a.nwineries, a.nwines, hw.variety, a.nbreweries, a.nbeers, hb.beer_style
      FROM aggregates a, highbeer hb, highwine hw`,
      // The "bind value" for the bind variable ":bnbv"
      [statename],
      {
        outFormat: oracledb.OUT_FORMAT_OBJECT
      });

      console.log(result.metaData); 
      console.log(result.rows);

      res.json(result.rows) //REALLY IMPORTANT
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.release();
        } catch (e) {
          console.error(e);
        }
      }
    }
}

// The exported functions, which can be accessed in index.js.
module.exports = {
	getStateDataWine: getStateDataWine,
  getDrinkPair: getDrinkPair,
  getFoodPair: getFoodPair,
  getStateStats: getStateStats
}