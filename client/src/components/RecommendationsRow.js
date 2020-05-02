import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecommendationsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="pairResults">
				<div className="type">{this.props.type}</div>
				<div className="name">{this.props.name}</div>
				<div className="pair_rating">{this.props.rating}</div>
				<div className="drink_rating">{this.props.drink_rating}</div>
			</div>
		);
	}
}
