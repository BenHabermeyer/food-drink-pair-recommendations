import React from 'react';
import '../style/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import GenreButton from './GenreButton';
import DashboardMovieRow from './DashboardMovieRow';
import winery from '../images/winery.jpg'
import food_wine from '../images/food_wine.png'
import wine_shelf from '../images/wine_shelf.jpeg'


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
    fetch("http://localhost:8081/home",
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
        <div className="container home-container">
          <div className="headerHome">Welcome to Food-Drink Pairer!</div>
          <div className="text-container">
            <div className="text">This application is a one-stop-shop for you to find the perfect pairing for your individual needs. With information on beer types and quality, wine types and quality, breweries, wineries, price, food pairings and their ratings, this application will allow the user to search for the perfect accompaniment for their meal. 
            </div>
          </div>
          <br></br>
          <div className="title">Info</div>
          <div className="text-container">
            <div className="text"> Get to know where your wine/beer comes from!</div>
          </div>
          <br></br>
          <img className="resize" src={winery} alt="winery"/>
          
          <br></br>
          <div className="title">Pair</div>
          <div className="text-container">
            <div className="text"> Find out what the best food are for your drink and what the best drink are for your food for the optimal dining experience!
            </div>
          </div>
          <br></br>
          <img className="resize" src={food_wine} alt="food and wine"/>
          <br></br>
          <div className="title">Map</div>
          <div className="text-container">
            <div className="text"> Find out where the different wineries and breweries are located in the US and try out their best offering!</div>
          </div>
          <br></br>
          <img className="resize" src={wine_shelf} alt="shelf of wine"/>
          <br></br>
        </div>
      </div>

    );
  }
}