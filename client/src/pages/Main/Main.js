import React, { Component } from "react";
import { Nav } from "../../components/Nav";

class Main extends Component {
  state = {
    articles: [],
  };


  render() {
    return (
      <div>
          <Nav/>
      </div>
    );
  }
}

export default Main;
