import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class FoodRecRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movieResults">
				<div className="foodRec">{this.props.food}</div>
				<div className="foodRec">{this.props.rating}</div>
			</div>
		);
	}
}