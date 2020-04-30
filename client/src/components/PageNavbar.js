import React from 'react';
import '../style/PageNavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PageNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			navDivs: []
		}
	}

	componentDidMount() {
		const pageList = ['home', 'pair', 'info', 'map'];

		let navbarDivs = pageList.map((page, i) => {
			if (this.props.active === page) {
				return <a className="nav-item nav-link active" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
			else {
				return <a className="nav-item nav-link" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
		})

		this.setState({
			navDivs: navbarDivs
		});
	}

	render() {
		return (
			<div className="navTitle">
				<nav className="navbar navbar-expand-lg navbar-dark">
			      <span className="navbar-brand center">Food-Drink Pairer</span>
			      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
			        <div className="navbar-nav">
			        {this.state.navDivs}
			        </div>
			      </div>
			    </nav>
			</div>
        );
	}
}