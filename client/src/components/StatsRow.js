import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class StatsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movieResults">
				<div className="genre">{this.props.first}</div>
				<div className="movie">{this.props.second}</div>
				<div className="genre">{this.props.third}</div>
				<div className="movie">{this.props.fourth}</div>
				<div className="genre">{this.props.fifth}</div>
				<div className="movie">{this.props.sixth}</div>
			</div>
		);
	}
}
