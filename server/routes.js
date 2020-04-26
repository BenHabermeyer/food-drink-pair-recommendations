// OLD SETUP
//var config = require('./db-config.js');
//var mysql = require('mysql');
//config.connectionLimit = 10;
//var connection = mysql.createPool(config);

// NEW SETUP
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

//inside of starting app call function to set up connection and use connection

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

//req is input, res is output
//for an input state, find 10 brew/wineries and their best wine/beer, ordered by average review score desc, with best beer/wine
async function getStateData(req, res) {
  statename = req.params.stateName;
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
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
      SELECT DISTINCT w.winery AS winery, r.rating AS rating, b.title AS title
      FROM wine_origin w JOIN bestwine b ON w.winery = b.winery AND w.title=b.title 
          JOIN winery_rating r ON w.winery=r.winery
      WHERE w.province = :bnbv
      ORDER BY r.rating DESC`,
      // The "bind value" for the bind variable ":bnbv"
      [statename],
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
async function getDrinkPair(req, res) {
  foodname = req.params.foodName;
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
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
      connection = await oracledb.getConnection(dbConfig);
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

// The exported functions, which can be accessed in index.js.
module.exports = {
	getStateData: getStateData,
  getDrinkPair: getDrinkPair,
  getFoodPair: getFoodPair
}