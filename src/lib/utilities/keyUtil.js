export function keyify(o) {
  if (!o) {
    return null;
  }

  const type = typeof o;
  if (type === "function" || (type === "object" && !!o)) {
    try {
      return Object.keys(o);
    } catch (e) {
      console.error(e);
      return null;
    }
  } else if (type === "array") {
    try {
      return o.map(elt => elt.toString());
    } catch (e) {
      console.error(e);
      return null;
    }
  } else {
    return [o.toString()];
  }
}
