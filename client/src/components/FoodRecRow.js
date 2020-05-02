import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class FoodRecRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="foodResults">
				<div className="foodRec">{this.props.food}</div>
				<div className="foodRate">{this.props.rating}</div>
			</div>
		);
	}
}