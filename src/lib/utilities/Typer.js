import { keyify } from "./keyUtil";
import _ from "lodash";

class Typer {
  typeLister = {};

  constructor(object) {
    if (object) this.defineAll(object);
  }

  get keys() {
    return keyify(this.typeLister);
  }

  define(key, type) {
    if (this.typeLister.hasOwnProperty(key)) {
      console.error(`Key "${key}" already exists.`);
    } else {
      this.typeLister[key] = type;
    }
    return this.typeLister;
  }

  defineAll(object) {
    Object.keys(object).forEach(key => {
      this.define(key, object[key]);
    });
    return this.typeLister;
  }

  undefine(key) {
    if (!this.typeLister.hasOwnProperty(key)) {
      console.warn(`Can't undefine ${key} : key isn't defined.`);
    } else {
      delete this.typeLister[key];
    }
    return this.typeLister;
  }

  move(key, targetType) {
    if (this.typeLister.hasOwnProperty(key)) {
      this.typeLister[key] = targetType;
    } else {
      console.warn(`Can't move "${key}" : key isn't defined.`);
    }
    return this.typeLister;
  }

  validate(key, value) {
    if (key === undefined || value === undefined) return null;
    const type = this.typeLister[key];
    if (type) {
      if (typeof value === type) {
        return value;
      } else {
        console.error(
          `Value "${value}" must be instanceof ${type} for "${key}".`
        );
      }
    } else {
      console.warn(`Key "${key}" doesn't exist.`);
    }
    return null;
  }

  hasKey(key) {
    return this.typeLister.hasOwnProperty(key);
  }

  getValidIn(object) {
    if (!object) {
      return null;
    }
    try {
      return _.pickBy(object, (value, key) => typeof value === this.get(key));
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  getValidKeysIn(object) {
    return Object.keys(this.getValidIn(object));
  }

  get(key) {
    return this.typeLister[key];
  }
}

export default Typer;
