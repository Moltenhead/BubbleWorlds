import React from "react";
import BaseComponent from "../../../BaseComponent";
import Option from "./Option";

class Selector extends BaseComponent {
  constructor(props) {
    super(props, [props.selectorState], ["Selector"]);
    this.define({
      selectorState: "string",
      options: "array"
    });
  }

  state = { selectorState: "default", options: [] };

  componentDidUpdate(prevProps) {
    if (this.props.selectorState !== prevProps.selectorState) {
      this.set("selectorState", this.props.selectorState);
    }
    if (this.props.options !== prevProps.options) {
      const options = this.props.options || [];
      this.set("options", options);
    }
  }

  render() {
    const className = this.state.className;
    const optionsList = this.state.options.map(option => (
      <Option params={option.params} />
    ));
    return <div className={className}>{optionsList}</div>;
  }
}

Option.defaultProps = {
  selectorState: "default",
  options: []
};

export default Selector;
