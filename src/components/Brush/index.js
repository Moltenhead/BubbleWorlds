import React, { Component } from "react";
import "./index.scss";

class Brush extends Component {
  state = {};

  render() {
    const brushStyle = { left: this.props.x, top: this.props.y };
    return (
      <div
        ref={node => (this.brushRef = node)}
        className={`Brush ${this.props.brushType}`}
        style={brushStyle}
      />
    );
  }
}

Brush.defaultProps = { brushType: "default" };

export default Brush;
