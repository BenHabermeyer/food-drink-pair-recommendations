import React from 'react';
import '../style/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import GenreButton from './GenreButton';
import DashboardMovieRow from './DashboardMovieRow';
import winery from '../images/winery.jpg'
import food_wine from '../images/food_wine.png'


export default class Home extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
    }


  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/genres",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(genreList => {
      if (!genreList) return;
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let genreDivs = genreList.map((genreObj, i) =>
      <GenreButton id={"button-" + genreObj.genre} onClick={() => this.showMovies(genreObj.genre)} genre={genreObj.genre} />
      );

      

      // Set the state of the genres list to the value returned by the HTTP response from the server.
      this.setState({
        genres: genreDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }


  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showMovies(genre) {
  
  }


  render() {    
    return (
      <div className="Home">

        <PageNavbar active="home" />

        <br></br>
        <div className="container movies-container">
          <div className="jumbotron">
            <div className="display-3">Welcome to Food-Drink Pairer!</div>
            <div className="lead">
              This application is a one-stop-shop for you to find the perfect pairing for your individual needs. With information on beer types and quality, wine types and quality, breweries, wineries, price, food pairings and their ratings, this application will allow the user to search for the perfect accompaniment for their meal. 
            </div>
          </div>

          <br></br>
          <div className="jumbotron">
            <div className="genres-container">
              <div className="movies-header">
                <div className="header-lg"><strong>Source</strong></div>
                <div className="lead">
                  Get to know where your wine/beer comes from!
                </div>                
              </div>
            </div>
          </div>
          <img className="resize" src={winery} alt="winery"/>

          <br></br>
          <div className="jumbotron">
            <div className="genres-container">
              <div className="movies-header">
                <div className="header-lg"><strong>Pair</strong></div>
                <div className="lead">
                  Find out what the best food are for your drink and what the best drink are for your food for the optimal dining experience!
                </div>
              </div>
            </div>
          </div>
          <img className="resize" src={food_wine} alt="food and wine"/>
          <br></br>
          <div className="jumbotron">
            <div className="genres-container">
              <div className="movies-header">
                <div className="header-lg"><strong>Map</strong></div>
                <div className="lead">
                  Do you prefer your beer/wine from a specific location? This is where you can find other similar drink or find new ones!
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}