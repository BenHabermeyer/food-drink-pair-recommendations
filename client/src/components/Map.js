import React from 'react';
import '../style/Map.CSS';
import USAMap from "react-usa-map";
import PageNavbar from './PageNavbar';

export default class MapUS extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedState: "Select A State",
      stateMap: new Map(),
      stateFill: {}
    };

    this.mapHandler = this.mapHandler.bind(this);
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

  mapHandler = (event) => {
    var statename = event.target.dataset.name
    this.updateCurrentState(statename)
    this.updateCurrentColor(statename)
  }

  updateCurrentState = (statename) => {
    this.setState({
      selectedState: this.state.stateMap.get(statename)
    });
  }

  updateCurrentColor = (statename) => {
    this.setState({
      stateFill: {statename: {fill: "navy"}}
    });
  }
 
  render() {
    return (
      <div className="MapUS">
        <PageNavbar active="map" />

        <div className="container source-container">
            <div className="jumbotron">
              <div className="h1" align="center">{this.state.selectedState}</div>
              <div className="years-container">
                <USAMap customize={this.state.stateFill} onClick={this.mapHandler} s/>
              </div>
            </div>
          </div>
      </div>
    );
  }
}