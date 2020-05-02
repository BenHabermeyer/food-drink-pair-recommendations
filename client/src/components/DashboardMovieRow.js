import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class DashboardMovieRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movieResults">
				<div className="genre">{this.props.WINE}</div>
				<div className="winery">{this.props.WINERY}</div>
				<div className="rating">{this.props.AVG_RATING}</div>
			</div>
		);
	}
}
