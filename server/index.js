const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */




/* ---- (Source) ---- */
// The route localhost:8081/genres is registered to the function
// routes.getAllGenres, specified in routes.js.
app.get('/source', routes.getWineries);






/* ---- (Pair) ---- */
app.get('/pair/:food', routes.getFoodPair;



/* ---- (Pair) ---- */
app.get('/pair/:drink', routes.getDrinkPair;




/* ---- (Info) ---- */
app.get('/info', routes.getInfo);





/* ---- (Map) ---- */
app.get('/map', routes.map); //???








app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});