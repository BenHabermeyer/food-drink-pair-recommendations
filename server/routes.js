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
async function getStateData(req, res) {
  statename = req.params.stateName;
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
      let result = await connection.execute(
        // The statement to execute
      `SELECT w.winery AS winery, w.province AS state
      FROM wine_origin w
      WHERE w.province = :bnbv`,
      // The "bind value" for the bind variable ":bnbv"
      ["Virginia"],
      {
        maxRows: 3,
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
      `SELECT food, beer_style, rating
      FROM beer_pair
      WHERE food = :bnbv`,
      // The "bind value" for the bind variable ":bnbv"
      [foodname],
      {
        maxRows: 5,
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