import React from "react";
import BaseComponent from "../BaseComponent";

import "./index.scss";

class Sample extends BaseComponent {
  constructor(props) {
    super(props, [], ["Sample"]);
  }

  render() {
    const className = this.state.className;
    return <div className={className} />;
  }
}

export default Sample;
