var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- (Source page 1) ---- */
function getWineries(req, res) {
  var rec = req.params.location; // maybe use state as dropdown?
  var query = ''; // return all wineries and breweries, and info for the location
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


/* ---- (Pair page 2) ---- */
function getFoodPair(req, res) {
  var rec1 = req.params.drink;
  var rec2 = req.params.pair_rate;
  var query = ''; // get food pairing for the drink
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- (Pair page 2) ---- */
function getDrinkPair(req, res) {
  var rec1 = req.params.food;
  var rec2 = req.params.pair_rate;
  var rec3 = req.params.wine_price;
  var rec4 = req.params.drink_rating;
  var query = ''; // get drink pairing for the food
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- (Info page 3) ---- */
function getInfo(req, res) {
	var rec = req.params.drink;
  var query = ''; // get info on the drink
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- (Map page 4) ---- */
function map(req, res) {
  var query = ''; // join and group map with wineries/breweries table
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// The exported functions, which can be accessed in index.js.
module.exports = {
	getWineries: getWineries,
  getFoodPair: getFoodPair,
	getDrinkPair: getDrinkPair,
	getInfo: getInfo,
	map: map
}