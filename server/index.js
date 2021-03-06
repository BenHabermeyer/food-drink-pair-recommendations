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


/* ---- (map) ---- */
// The route localhost:8081/genres is registered to the function
app.get('/map/:stateName', routes.getStateDataWine);

app.get('/pair/:foodName', routes.getDrinkPair);

app.get('/drinkpair/:drinkType', routes.getFoodPair);

app.get('/mapstats/:stateName', routes.getStateStats);

app.get('/prices', routes.getPrices);

app.get('/info/:price', routes.bestWinePerPrice);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});
