import React, { Component } from "react";
import API from "../../utils/API";
import { Nav } from "../../components/Nav";
import "./shotlogger.css"


class Shotlogger extends Component {
  state = {
    shots:[],

    lastShot:{
      "shooter":"",
      "x":"",
      "y":"",
    },
    outcomeToggle:"made",
  };

  handleInputChange = event => {
    const { outcomeToggle, value } = event.target;
    this.setState({
      outcomeToggle: value
    });

  };

  getPosition = event => {
    var elem = event.target
    var rect = elem.getBoundingClientRect();
    var x = event.clientX - rect.left; // x == the location of the click in the document - the location (relative to the left) of the canvas in the document
    var y = event.clientY - rect.top; // y == the location of the click in the document - the location (relative to the top) of the canvas in the document
    
    // This method will handle the coordinates and will draw them in the canvas.
    this.drawCoordinates(x,y);
  };

  drawCoordinates = (x,y) => {
    var pointSize = 8; // Change according to the size of the point.
    var ctx = document.getElementById("canvas").getContext("2d");

    this.setState({lastShot: {x: x, y: y}});

    if(this.state.outcomeToggle ==="missed"){
      ctx.fillStyle = "#ff2626"; // Red color	
      this.state.lastShot.made=0;
      this.state.lastShot.attempts=1;
      this.state.shots.push({
        "x":x,
        "y":y,
        "shooter":"",
        "made":0,
        //default z value
        //this is the number of std deviations away from mean at this location
        //"z":-2,
        //"attempts":1,
      });
    }
    else{
      ctx.fillStyle = "#0000FF"; // Blue color	
      this.state.lastShot.made=0;
      this.state.lastShot.attempts=1;
      this.state.shots.push({
        "x":x,
        "y":y,
        "shooter":"",
        "made":1,
        //default z value
        //this is the number of std deviations away from mean at this location
        //"z":2,
        //"attempts":1,
      });
    }
    
    ctx.beginPath(); //Start path
    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a circle point using the arc function of the canvas with a point structure.
    ctx.fill(); // Close the path and fill.

    // this.lastX = x;
    // this.lastY = y;
    
  };

  render() {
    return (
      <div>
        <Nav/>
        <h2>Shotlogger</h2>
        <div>
          <div >
            <canvas onClick={this.getPosition} className="court" id="canvas" width="624" height="400"/>
          </div>
          <div>
            <input  type="radio" name="outcome" value="made"
                onChange={this.handleInputChange}></input>
            <label>Made</label>
            <input type="radio" name="outcome" value="missed"
                onChange={this.handleInputChange}></input>
            <label>Missed</label>
          </div>
          <div>  
          </div>
          <div className="last">
            <div>Last Added</div>
            <div>Shooter: {this.state.lastShot.shooter}</div>
            <div>X Position: {this.state.lastShot.x} </div>
            <div>Y Postion: {this.state.lastShot.y}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Shotlogger;
