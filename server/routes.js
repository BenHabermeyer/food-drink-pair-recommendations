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
      `SELECT DISTINCT w.winery AS winery, AVG(r.points) AS rating
      FROM wine_origin w JOIN wine_review r ON w.title=r.title
      WHERE w.province = :bnbv
      GROUP BY w.winery
      ORDER BY AVG(r.points) DESC`,
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