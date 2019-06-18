import React from "react";
import BaseComponent from "../BaseComponent";
import "./index.scss";

import Selector from "./Selector";

class Brush extends BaseComponent {
  constructor(props) {
    super(props, [props.brushType], ["Brush"]);
    this.define({
      brushType: "string"
    });
  }

  prevBrushType = this.props.brushType;

  componentDidUpdate(prevProps) {
    if (this.props.brushType !== prevProps.brushType) {
      this.setBrushType(this.props.brushType);
    }
  }

  setBrushType(str) {
    this.unsetPrevBrush();
    this.prevBrushType = str;
    this.set("brushType", str);
  }

  unsetPrevBrush() {
    this.removeClass(this.prevBrushType);
  }

  state = {};

  render() {
    const brushStyle = { left: this.props.x, top: this.props.y };
    return (
      <div
        ref={node => (this.brushRef = node)}
        className={this.state.className}
        style={brushStyle}
      >
        <Selector />
      </div>
    );
  }
}

Brush.defaultProps = { brushType: "default" };

export default Brush;
