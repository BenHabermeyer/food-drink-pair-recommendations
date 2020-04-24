import React from 'react';
import PageNavbar from './PageNavbar';
import BestGenreRow from './BestGenreRow';
import '../style/BestGenres.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Info extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedStyle: "",
			styles: [],
			beers: []
		};

		this.submitStyle = this.submitStyle.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	/* ---- Q3a (Best Genres) ---- */
	componentDidMount() {
	
	}

	handleChange(e) {
		this.setState({
			selectedStyle: e.target.value
		});
	}

	/* ---- Q3b (Best Genres) ---- */
	submitStyle() {
		
	}

	render() {

		return (
			<div className="Info">
				<PageNavbar active="info" />

				<div className="container source-container">
			      <div className="jumbotron">
			        <div className="h5">Beer Styles</div>

			        <div className="years-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedStyle} onChange={this.handleChange} className="dropdown" id="stylesDropdown">
			            	{this.state.styles}
			            </select>
			            <button className="submit-btn" id="stylesSubmitBtn" onClick={this.submitStyle}>Submit</button>
			          </div>
			        </div>
			      </div>
			      <div className="jumbotron">
			        <div className="movies-container">
			          <div className="movie">
			            <div className="header"><strong>Beer</strong></div>
			            <div className="header"><strong>Average Rating</strong></div>
			          </div>
			          <div className="movies-container" id="results">
			            {this.state.beers}
			          </div>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}