const isEmpty = (obj: {} | undefined): boolean | undefined => {
  if (obj) return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export default isEmpty;
