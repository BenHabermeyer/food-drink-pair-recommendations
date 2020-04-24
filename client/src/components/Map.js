import React from 'react';
import '../style/Map.CSS';
import USAMap from "react-usa-map";
import PageNavbar from './PageNavbar';

export default class Map extends React.Component {
  mapHandler = (event) => {
    alert(event.target.dataset.name);
  };

  statesFilling = () => {
    return {
      "NJ": {
        fill: "navy",
        clickHandler: () => alert("Custom callback for the NJ state")
      },
      "NY": {
        fill: "#CC0000"
      }
    };
  };

  render() {
    return (
      <div className="Map">
        <PageNavbar active="map" />

        <div className="container source-container">
            <div className="jumbotron">
              <div className="h1" align="center">USA Map</div>

              <div className="years-container">
                <USAMap customize={this.statesFilling()} onClick={this.mapHandler} />
              </div>
            </div>
          </div>
      </div>
    );
  }
}