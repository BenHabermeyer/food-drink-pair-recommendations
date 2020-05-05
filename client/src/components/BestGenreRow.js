import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenreRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movieResults">
				<div className="name">{this.props.name}</div>
				<div className="rateDrink">{this.props.rating}</div>
				<div className="drink">{this.props.best}</div>
			</div>
		);
	}
}
