import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenreRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movieResults">
				<div className="genre">{this.props.name}</div>
				<div className="movie">{this.props.rating}</div>
				<div className="genre">{this.props.best}</div>
			</div>
		);
	}
}
