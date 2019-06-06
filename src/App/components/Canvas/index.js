import React, { Component } from "react";
import "./index.scss";

import Brush from "../Brush";

class Canvas extends Component {
  state = {};
  handleMouseEnter = e => {
    this.setState({
      active: true
    });
  };
  handleMouseLeave = e => {
    this.setState({
      active: false
    });
  };

  handleMouseMove = e => {
    if (this.state.active)
      this.setState({
        target_left: e.clientX,
        target_top: e.clientY
      });
  };
  render() {
    return (
      <div
        ref={node => (this.canvasRef = node)}
        className="Canvas debug noMouse"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
      >
        <Brush
          x={this.state.target_left}
          y={this.state.target_top}
          brushType={this.state.brushType}
        />
      </div>
    );
  }
}

export default Canvas;
