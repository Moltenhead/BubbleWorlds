import React from "react";
import BaseComponent from "../BaseComponent";
import "./index.scss";

import Brush from "../Brush";

class Canvas extends BaseComponent {
  constructor(props) {
    super(props, ["noMouse"], ["Canvas", "debug"]);
    this.define({
      brushType: "string",
      active: "boolean",
      moving: "boolean",
      mouseDown: "boolean",
      target_left: "number",
      target_top: "number"
    });
  }

  state = {
    active: false,
    moving: false,
    mouseDown: false
  };

  mouseStopTimeout = null;

  previousType = "default";

  setBrushType(str) {
    this.previousType = this.state.brushType;
    this.set("brushType", str);
  }

  handleMouseEnter = e => {
    this.set("active");
  };
  handleMouseLeave = e => {
    this.unset("active");
  };

  handleMouseDown = e => {
    if (this.state.active) {
      this.removeClass("noMouse");
      this.set("mouseDown");
    }
  };
  handleMouseUp = e => {
    this.appendClass("noMouse");
    this.unset("mouseDown");
    this.updatePositionTarget(e);
  };

  initMoving() {
    this.set("moving");
    clearTimeout(this.mouseStopTimeout);
    const _this = this;
    this.mouseStopTimeout = setTimeout(
      () => {
        _this.unset("moving");
      },
      30,
      this
    );
  }

  handleMouseMove = e => {
    if (this.state.active && this.state.mouseDown === false) {
      this.initMoving();
      this.updatePositionTarget(e);
    }
  };

  updatePositionTarget(e) {
    this.stater = {
      target_left: e.clientX,
      target_top: e.clientY
    };
  }

  render() {
    const className = this.state.className;
    const x = this.state.target_left;
    const y = this.state.target_top;
    const brushType = this.state.brushType;
    return (
      <div
        ref={node => (this.canvasRef = node)}
        className={className}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        <Brush x={x} y={y} brushType={brushType} />
      </div>
    );
  }
}

export default Canvas;
