import React from 'react';
import PageNavbar from './PageNavbar';
import RecommendationsRow from './RecommendationsRow';
import FoodRecRow from './FoodRecRow';
import '../style/Pair.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Pair extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			foodName: "",
			drinkType: "",
			recDrinkPairs: [],
			recFoodPairs: []
		};

		this.handledrinkTypeChange = this.handledrinkTypeChange.bind(this);
		this.handlefoodNameChange = this.handlefoodNameChange.bind(this);
		this.submitFood = this.submitFood.bind(this);
		this.submitDrink = this.submitDrink.bind(this);
	}

	handlefoodNameChange(e) {
		this.setState({
			foodName: e.target.value
		});
	}

	handledrinkTypeChange(e) {
		this.setState({
			drinkType: e.target.value
		});
	}


	/* ---- Q2 (Recommendations) ---- */
	// Hint: Name of movie submitted is contained in `this.state.foodName`.
	submitFood() {
		   // Send an HTTP request to the server.
    fetch("http://localhost:8081/pair/" + this.state.foodName,
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(pairList => {
      console.log(pairList);
      if (!pairList) return;
      // Map each movieObj in movieList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let pairDivs = pairList.map((pairObj, i) =>
      	<RecommendationsRow type={pairObj.TYPE} name={pairObj.NAME} rating={pairObj.RATING} drink_rating={pairObj.DRINK_RATING}/>
      // <RecommendationsRow title = {pairObj.title} id={pairObj.beerwine} rating = {pairObj.rating}/>
        );

      // Set the state of the genres list to the value returned by the HTTP response from the server.
      this.setState({
        recDrinkPairs: pairDivs
      })

    });
	}

	submitDrink() {
	fetch("http://localhost:8081/drinkpair/" + this.state.drinkType,
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(pairList => {
      console.log(pairList);
      if (!pairList) return;
      // Map each movieObj in movieList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let pairDivs = pairList.map((pairObj, i) =>
      	<FoodRecRow food={pairObj.FOOD} rating={pairObj.RATING}/>
      // <RecommendationsRow title = {pairObj.title} id={pairObj.beerwine} rating = {pairObj.rating}/>
        );

      // Set the state of the genres list to the value returned by the HTTP response from the server.
      this.setState({
        recFoodPairs: pairDivs
      })

    });
	}



	render() {

		return (
			<div className="Pair">
				<PageNavbar active="pair" />

			    <div className="container pairOuter-container">
			    	<div className="pair-container">
			    		<div className="pair-title">Pair Your Food</div>
			    		<br></br>
			    		<div className="input-container">
			    			<input type='text' placeholder="Enter Food Name" value={this.state.foodName} onChange={this.handlefoodNameChange} id="foodName" className="movie-input"/>
			    			<button id="submitFoodBtn" className="submit-btn" onClick={this.submitFood}>Submit</button>
			    		</div>
			    		<br></br>
			    		<div className="header-container">
			    			<div className="text">You may enjoy your food with...</div>
			    			<br></br>
			    			<div className="headers">
			    				<div className="typeHeader"><strong>Type</strong></div>
			    				<div className="nameHeader"><strong>Best of Its Kind</strong></div>
			    				<div className="headerRate"><strong>Pair Rating</strong></div>
					            <div className="headerRate"><strong>Drink Rating</strong></div>
			    			</div>
			    		</div>
			    		<div className="results-container" id="results">
			    			{this.state.recDrinkPairs}
			    		</div>
			    	</div>
			    	<br></br>
			    	<div className="pair-container">
			    		<div className="pair-title">Pair Your Drink</div>
			    		<br></br>
			    		<div className="input-container">
			    			<input type='text' placeholder="Enter Drink Type" value={this.state.drinkType} onChange={this.handledrinkTypeChange} id="drinkType" className="movie-input"/>
			    			<button id="submitDrinkBtn" className="submit-btn" onClick={this.submitDrink}>Submit</button>
			    		</div>
			    		<br></br>
			    		<div className="header-container">
			    			<div className="text">You may enjoy your drink with...</div>
			    			<br></br>
			    			<div className="headers">
			    				<div className="recHeader"><strong>Food</strong></div>
			    				<div className="recRateHeader"><strong>Pair Rating</strong></div>
			    			</div>
			    		</div>
			    		<div className="results-container" id="results">
			    			{this.state.recFoodPairs}
			    		</div>
			    	</div>
			    </div>
		    </div>
		);
	}
}
