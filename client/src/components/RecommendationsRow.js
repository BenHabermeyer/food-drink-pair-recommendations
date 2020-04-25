import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecommendationsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="pairResults">
				<div className="Food">{this.props.title}</div>
				<div className="Name of Beer/Wine">{this.props.beerwine}</div>
				<div className="rating">{this.props.rating}</div>
				{
				//<div className="votes">VOTE_COUNT</div>
			  }
			</div>
		);
	}
}
