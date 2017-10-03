import React from "react";

class Canvas extends React.Component {
  componentDidMount() {
      this.updateCanvas();
  }
  updateCanvas() {
      const ctx = this.refs.canvas.getContext('2d');
      ctx.fillRect(0,0, 100, 100);
  }
  render() {
      return (
          <canvas ref="canvas" width={624} height={400}/>
      );
  }
};

export default Canvas;
