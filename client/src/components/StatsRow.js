import React from 'react';
import '../style/BestGenres.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class StatsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movieResults">
				<div className="mapStats">{this.props.first}</div>
				<div className="mapStats">{this.props.second}</div>
				<div className="mapStats">{this.props.third}</div>
				<div className="mapStats">{this.props.fourth}</div>
				<div className="mapStats">{this.props.fifth}</div>
				<div className="mapStats">{this.props.sixth}</div>
			</div>
		);
	}
}
