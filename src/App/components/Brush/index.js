import React from "react";
import BaseComponent from "../BaseComponent";
import "./index.scss";

import Selector from "./Selector";

class Brush extends BaseComponent {
  constructor(props) {
    super(props, [props.brushType], ["Brush"]);
  }

  componentDidUpdate(prevProps) {
    if (this.props.brushStyle !== prevProps.brushStyle) {
      this.appendClass(prevProps.brushStyle);
    }
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
