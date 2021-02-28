export default (getter, list) => list && list.length
  ? list.reduce((acc, item) => getter(acc) < getter(item) ? item : acc)
  : {};
