export default (getter, list) => list.reduce(
    (acc, item) => getter(acc) > getter(item) ? item : acc 
);