import React from "react";
import BaseComponent from "../../BaseComponent";

import "./index.scss";

class World extends BaseComponent {
  constructor(props) {
    super(props, [], ["World"]);
    this.define({
      left: "number",
      top: "number"
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.x !== prevProps.x) {
      this.stater = { left: this.props.x };
    }
    if (this.props.y !== prevProps.y) {
      this.stater = { top: this.props.y };
    }
  }

  state = {};

  render() {
    const { className } = this.state;
    const { width, height, x, y } = this.props;
    const worldStyle = {
      width: `${width}px`,
      height: `${height}px`,
      left: `${x}px`,
      top: `${y}px`
    };
    return (
      <div
        ref={node => (this.worldRef = node)}
        className={className}
        style={worldStyle}
      />
    );
  }
}

export default World;
