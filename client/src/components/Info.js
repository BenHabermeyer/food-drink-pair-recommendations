import React from 'react';
import PageNavbar from './PageNavbar';
import InfoRow from './InfoRow';
import '../style/Info.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Info extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedPrice: "",
			prices: [],
			wines: []
		};

		this.submitPrice = this.submitPrice.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	/* ---- Q3a (Best Genres) ---- */
	componentDidMount() {
		  // Send an HTTP request to the server.
			fetch("http://localhost:8081/prices",
			{
			method: 'GET' // The type of HTTP request.
			}).then(res => {
			// Convert the response data to a JSON.
			return res.json();
			}, err => {
			// Print the error if there is one.
			console.log(err);
		}).then(priceList => {
			console.log(priceList);
			if (!priceList) return;
			// Map each genreObj in genreList to an HTML element:
			// A button which triggers the showMovies function for each genre.
			let priceDivs = priceList.map((priceObj, i) =>
			<option key = {i} value={priceObj.PRICE}> {priceObj.PRICE}  </option>
			);


			// Set the state of the genres list to the value returned by the HTTP response from the server.
			this.setState({
				prices: priceDivs
			});
			}, err => {
			// Print the error if there is one.
			console.log(err);
			});

	}

	handleChange(e) {
		this.setState({
			selectedPrice: e.target.value
		});
	}

	/* ---- Q3b (Best Genres) ---- */
	submitPrice() {
					// Send an HTTP request to the server.
			fetch("http://localhost:8081/info/" + this.state.selectedPrice,
			{
			 method: 'GET' // The type of HTTP request.
			}).then(res => {
			 // Convert the response data to a JSON.
			 return res.json();
			}, err => {
			 // Print the error if there is one.
			 console.log(err);
		 }).then(wineList => {
			 console.log(wineList);
			 if (!wineList) return;
			 // Map each movieObj in movieList to an HTML element:
			 // A button which triggers the showMovies function for each genre.
			 let wineDivs = wineList.map((wineObj, i) =>
			 <InfoRow key = {i} WINE = {wineObj.WINE} WINERY = {wineObj.WINERY} AVG_RATING = {wineObj.AVG_RATING}/>
				 );

			 // Set the state of the genres list to the value returned by the HTTP response from the server.
			 this.setState({
				 wines:wineDivs
			 });
			}, err => {
			 // Print the error if there is one.
			 console.log(err);
			});
	}

	render() {

		return (
			<div className="Info">
				<PageNavbar active="info" />

				<div className="container infoOuter-container">
			      <div className="info-container">
			        <div className="info-title">Wine Price</div>

			        <div className="input-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedPrice} onChange={this.handleChange} className="dropdown" id="priceDropdown">
			            	{this.state.prices}
			            </select>
			            <button className="submit-btn" id="priceSubmitBtn" onClick={this.submitPrice}>Submit</button>
			          </div>
			        </div>
			      </div>
			      <div className="info-container">
			        <div className="infoHeader-container">
			        	<div className="text">Some of the best wines around your budget...</div>
			        	<br></br>
			    			<div className="infoHeaders">
			            <div className="wineHeader"><strong>Wine</strong></div>
									<div className="header"><strong>Winery</strong></div>
			            <div className="rateHeader"><strong>Average Rating</strong></div>
			          </div>
			          <div className="infoResults-container" id="results">
			            {this.state.wines}
			          </div>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}
