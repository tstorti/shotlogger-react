import React, { Component } from "react";
import { Nav } from "../../components/Nav";

class League extends Component {
  state = {
    articles: [],
  };


  render() {
    return (
      <div>
          <Nav/> 
          <h2>League Home</h2>  
      </div>
    );
  }
}

export default League;
