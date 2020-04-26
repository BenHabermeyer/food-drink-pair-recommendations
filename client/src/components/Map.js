import React from 'react';
import '../style/Map.CSS';
import USAMap from "react-usa-map";
import PageNavbar from './PageNavbar';
import BestGenreRow from './BestGenreRow';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

export default class MapUS extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedState: "Select A State",
      stateMap: new Map(),
      stateFill: {},
      winery: []
    };

    this.mapHandler = this.mapHandler.bind(this);
    this.submitStateName = this.submitStateName.bind(this);
  }

  componentDidMount() {
    const pageList = ['home', 'pair', 'source', 'map'];

    let kvArray = [
    ["AL", "Alabama"],
    ["AK", "Alaska"],
    ["AZ", "Arizona"],
    ["AR", "Arkansas"],
    ["CA", "California"],
    ["CO", "Colorado"],
    ["CT", "Connecticut"],
    ["DE", "Delaware"],
    ["FL", "Florida"],
    ["GA", "Georgia"],
    ["HI", "Hawaii"],
    ["ID", "Idaho"],
    ["IL", "Illinois"],
    ["IN", "Indiana"],
    ["IA", "Iowa"],
    ["KS", "Kansas"],
    ["KY", "Kentucky"],
    ["LA", "Louisiana"],
    ["ME", "Maine"],
    ["MD", "Maryland"],
    ["DC", "Maryland"],
    ["MA", "Massachusetts"],
    ["MI", "Michigan"],
    ["MN", "Minnesota"],
    ["MS", "Mississippi"],
    ["MO", "Missouri"],
    ["MT", "Montana"],
    ["NE", "Nebraska"],
    ["NV", "Nevada"],
    ["NH", "New Hampshire"],
    ["NJ", "New Jersey"],
    ["NM", "New Mexico"],
    ["NY", "New York"],
    ["NC", "North Carolina"],
    ["ND", "North Dakota"],
    ["OH", "Ohio"],
    ["OK", "Oklahoma"],
    ["OR", "Oregon"],
    ["PA", "Pennsylvania"],
    ["RI", "Rhode Island"],
    ["SC", "South Carolina"],
    ["SD", "South Dakota"],
    ["TN", "Tennessee"],
    ["TX", "Texas"],
    ["UT", "Utah"],
    ["VT", "Vermont"],
    ["VA", "Virginia"],
    ["WA", "Washington"],
    ["WV", "West Virginia"],
    ["WI", "Wisconsin"],
    ["WY", "Wyoming"]
    ];
    let kvMap = new Map(kvArray);

    this.setState({
      stateMap: kvMap
    });
  }

  //what oappens with the onclock method
  mapHandler = (event) => {
    var statename = new Promise(function(resolve, reject) {
      resolve(event.target.dataset.name)
    })
    statename.then(this.updateCurrentState).then(this.submitStateName)
  }

  updateCurrentState = (statename) => {
    this.setState({
      selectedState: this.state.stateMap.get(statename)
    });
  }

  //to do
  updateCurrentColor = (statename) => {
    this.setState({
      stateFill: {statename: {fill: "navy"}}
    });
  }



  submitStateName() {
    fetch("http://localhost:8081/map/" + this.state.selectedState,
    {
      method: "GET"
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err);
    }).then(decList => {
      console.log(decList); //displays your JSON object in the console
      let decDivs = decList.map((dec, i) => 
        <BestGenreRow name={dec.WINERY} rating={dec.RATING} best={dec.TITLE}/>
      );

      this.setState({
        winery: decDivs
      });
      console.log(this.state.winery)
    });
  }
 
  render() {
    return (
      <div className="MapUS">
        <PageNavbar active="map" />

        <div className="container source-container">
            <div className="jumbotron">
              <div className="h1" align="center">{this.state.selectedState}
              </div>
              <div className="years-container">
                <USAMap customize={this.state.stateFill} onClick={this.mapHandler} s/>
              </div>
            </div>
            <div className="jumbotron">
              <div className="h3" align="center">Top 10 Wineries/Breweries In Your State</div>
              <RadioGroup onChange={ this.onChange } value='wine' horizontal>
                <RadioButton value="wine" iconSize={20} iconInnerSize={10}>
                  Wine
                </RadioButton>
                <RadioButton value="beer" iconSize={20} iconInnerSize={10}>
                  Beer
                </RadioButton>
              </RadioGroup>
              <div className="movies-container">
                <div className="movie">
                  <div className="header"><strong>Winery</strong></div>
                  <div className="header"><strong>Average Wine Rating</strong></div>
                  <div className="header"><strong>Best Wine</strong></div>
                </div>
                <div className="movies-container" id="results">
                  {this.state.winery}
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}