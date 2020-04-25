import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecommendationsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movieResults">
				<div className="genre">{this.props.title}</div>
				<div className="rating">{this.props.beerwine}</div>
				<div className="rating">{this.props.rating}</div>
			</div>
		);
	}
}
