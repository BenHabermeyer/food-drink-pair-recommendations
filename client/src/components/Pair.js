import React from 'react';
import PageNavbar from './PageNavbar';
import RecommendationsRow from './RecommendationsRow';
import '../style/Pair.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Pair extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			foodName: "",
			recPairs: []
		}

		this.handlefoodNameChange = this.handlefoodNameChange.bind(this);
		this.submitFood = this.submitFood.bind(this);
	}

	handlefoodNameChange(e) {
		this.setState({
			foodName: e.target.value
		});
	}

	/* ---- Q2 (Recommendations) ---- */
	// Hint: Name of movie submitted is contained in `this.state.foodName`.
	submitFood() {
		   // Send an HTTP request to the server.
    fetch("http://localhost:8081/recommendations/" + this.state.foodName,
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
      <RecommendationsRow title = {pairObj.title} id={pairObj.beerwine} rating = {pairObj.rating}/>
        );

      // Set the state of the genres list to the value returned by the HTTP response from the server.
      this.setState({
        recPairs: pairDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
	}


	render() {

		return (
			<div className="Pair">
				<PageNavbar active="pair" />

			    <div className="container pair-container">
			    	<div className="jumbotron">
			    		<div className="h5">Pair</div>
			    		<br></br>
			    		<div className="input-container">
			    			<input type='text' placeholder="Enter Food Name" value={this.state.foodName} onChange={this.handlefoodNameChange} id="foodName" className="movie-input"/>
			    			<button id="submitFoodBtn" className="submit-btn" onClick={this.submitFood}>Submit</button>
			    		</div>
			    		<div className="header-container">
			    			<div className="h6">You may enjoy the pairing of...</div>
			    			<div className="headers">
			    				<div className="header"><strong>Food</strong></div>
			    				<div className="header"><strong>Name of Beer/Wine</strong></div>
					            <div className="header"><strong>Rating</strong></div>
											{
					            //<div className="header"><strong>Vote Count</strong></div>
										}
			    			</div>
			    		</div>
			    		<div className="results-container" id="results">
			    			{this.state.recPairs}
			    		</div>
			    	</div>
			    </div>
		    </div>
		);
	}
}
