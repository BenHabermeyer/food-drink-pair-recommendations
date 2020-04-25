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
  console.log("entered");
  foodname = req.params.foodName;
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
      let result = await connection.execute(
        // The statement to execute
      `(SELECT FOOD, VARIETY AS TYPE, RATING
        FROM WINE_PAIR
        WHERE FOOD = :bnbv)
        UNION
        (SELECT FOOD, BEER_STYLE AS TYPE, RATING
        FROM BEER_PAIR
        WHERE FOOD = :bnbv) ORDER BY RATING DESC`,
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

// The exported functions, which can be accessed in index.js.
module.exports = {
	getStateData: getStateData,
  getDrinkPair: getDrinkPair
}