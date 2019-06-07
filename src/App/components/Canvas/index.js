import React, { Component } from "react";
import "./index.scss";

import ClassNameHandler from "../../../lib/utilities/ClassNameHandler"

import Brush from "../Brush";

class Canvas extends Component {
  state = {
    active: false,
    moving: false,
    mouseDown: false
  };

  mouseStopTimeout = null;
  classNameHandler = new ClassNameHandler(["noMouse"]);
  previousType= "default";

  appendClass(str) {
    this.setState({classNameAdditions: this.classNameHandler.append(str).toString()});
  }
  removeClass(str) {
    this.setState({classNameAdditions: this.classNameHandler.remove(str).toString()});
  }

  appendActiveClass() {
    this.appendClass("active");
  }
  removeActiveClass() {
    this.removeClass(["active", "moving"]);
  }

  appendMovingClass() {
    this.appendClass("moving");
  }
  removeMovingClass() {
    this.removeClass("moving");
  }

  appendMouseDownClass() {
    this.appendClass("mouse-down");
  }
  removeMouseDownClass() {
    this.removeClass("mouse-down");
  }

  appendNoMouseClass() {
    this.appendClass("noMouse");
  }
  removeNoMouseClass() {
    this.removeClass("noMouse");
  }

  activeTo(bool) {
    this.setState({
      active: bool
    });
  }
  movingTo(bool) {
    this.setState({
      moving: bool
    });
  }
  mouseDownTo(bool) {
    this.setState({
      mouseDown: bool
    });
  }
  brushTypeTo(str) {
    this.previousType = this.state.brushType;
    this.setState({
      brushType: str
    });
  }

  setActive() {
    this.activeTo(true);
    this.appendActiveClass();
  }
  unsetActive() {
    this.activeTo(false);
    this.removeActiveClass();
  }

  setMoving() {
    this.movingTo(true);
    this.appendMovingClass();
  }
  unsetMoving() {
    this.movingTo(false);
    this.removeMovingClass();
  }

  setMouseDown() {
    this.mouseDownTo(true);
    this.removeNoMouseClass();
    this.appendMouseDownClass();
  }
  unsetMouseDown() {
    this.mouseDownTo(false);
    this.appendNoMouseClass();
    this.removeMouseDownClass();
  }


  handleMouseEnter = e => {
    this.setActive();
  }
  handleMouseLeave = e => {
    this.unsetActive();
  }

  handleMouseDown = e => {
    if (this.state.active)
      this.setMouseDown();

  }
  handleMouseUp = e => {
    this.unsetMouseDown();
  }

  initMoving() {
    this.setMoving();
    clearTimeout(this.mouseStopTimeout);
    const _this = this;
    this.mouseStopTimeout = setTimeout(function() { _this.unsetMoving() }, 30, this);
  }

  handleMouseMove = e => {
    console.log(this.state.active && this.state.mouseDown === false)
    if (this.state.active && this.state.mouseDown === false) {
      this.initMoving();
      this.updatePositionTarget(e);
    }
  };

  updatePositionTarget(e) {
    this.setState({
      target_left: e.clientX,
      target_top: e.clientY
    });
  }

  render() {
    return (
      <div
        ref={node => (this.canvasRef = node)}
        className={`Canvas debug ${this.state.classNameAdditions}`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
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
