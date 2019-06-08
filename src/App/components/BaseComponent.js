import { Component } from "react";

import ClassNameHandler from "../../lib/utilities/ClassNameHandler";
import Typer from "../../lib/utilities/Typer";

class BaseComponent extends Component {
  constructor(props, classNameList = [], defaultClassNameList = []) {
    super(props);
    this.classNameHandler = new ClassNameHandler(
      classNameList,
      defaultClassNameList
    );
  }

  componentDidMount() {
    this.setState({ className: this.classNameHandler.toString() });
  }

  typer = new Typer();

  appendClass(str) {
    this.setState({
      className: this.classNameHandler.append(str).toString()
    });
  }
  removeClass(str) {
    this.state &&
      this.setState({
        className: this.classNameHandler.remove(str).toString()
      });
  }

  define(stateKeyTypePairs) {
    return this.typer.defineAll(stateKeyTypePairs);
  }

  set stater(object) {
    object && this.state && this.setState(this.typer.getValidIn(object));
  }

  set(key, value = undefined) {
    value = this.typer.get(key) === "boolean" ? true : value;
    const validValue = this.typer.validate(key, value);
    if (validValue) {
      this.appendClass(key);
      this.stater = { [key]: value };
    }

    return this;
  }
  unset(key, value = undefined) {
    value = this.typer.get(key) === "boolean" ? false : value;
    const validValue = this.typer.validate(key, value);
    if (validValue !== undefined) {
      this.removeClass(key);
      this.stater = { [key]: value };
    }

    return this;
  }

  setAll(object) {
    const validKeys = this.typer.getValidKeysIn(object);

    validKeys.forEach(key => {
      this.appendClass(key);
    });
    this.stater = object;

    return this;
  }
  unsetAll(object) {
    const validKeys = this.typer.getValidKeysIn(object);

    validKeys.forEach(key => {
      this.removeClass(key);
    });
    this.stater = object;

    return this;
  }
}

export default BaseComponent;
