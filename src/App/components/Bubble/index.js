import React from "react";
import BaseComponent from "../BaseComponent";
import "./index.scss";

import World from "./World";

class Bubble extends BaseComponent {
  constructor(props) {
    super(props, [], ["Bubble"]);
    this.define({
      bubbleRef: "object",
      worldWidth: "number",
      worldHeight: "number",
      worldX: "number",
      worldY: "number"
    });
  }

  componentDidMount() {
    const { Bubble } = this.refs;
    console.log(Bubble.getBoundingClientRect());
    const targetWidth = Bubble.clientWidth * 16;
    const targetHeight = Bubble.clientWidth * 9;
    const targetX = -(targetWidth / 2);
    const targetY = -(targetHeight / 2);
    this.stater = {
      worldWidth: targetWidth,
      worldHeight: targetHeight,
      worldX: targetX,
      worldY: targetY
    };
  }

  state = {};

  render() {
    const { className } = this.state;
    console.log(className);
    return (
      <div ref="Bubble" className={className}>
        <World
          width={this.state.worldWidth}
          height={this.state.worldHeight}
          x={this.state.worldX}
          y={this.state.worldY}
        />
      </div>
    );
  }
}

export default Bubble;
