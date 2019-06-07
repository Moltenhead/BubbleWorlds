import _ from "lodash"

class ClassNameHandler {
  constructor(classNameList, defaultClassNameList=undefined) {
    this.defaultClassNameList = defaultClassNameList || [];
    this.classNameList = classNameList;
  }

  handleList(list) {
    return list instanceof Array ? list : [list];
  }

  remove(list) {
    _.pullAll(this.classNameList, this.handleList(list));
    return this;
  }

  append(list) {
    this.classNameList = _.union(this.classNameList, this.handleList(list))
    return this;
  }

  toString() {
    return _.union(this.defaultClassNameList, this.classNameList).join(" ");
  }
}

export default ClassNameHandler