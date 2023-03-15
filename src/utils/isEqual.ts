type Indexed<T = unknown> = {
  [key in string]: T;
};

function isEqual(a: Indexed, b: Indexed): boolean {
  if (a !== Object(a) || b !== Object(b)) return false;

  return Object.entries(a).every(([key]) => {
    if (!b.hasOwnProperty(key)) {
      return false;
    }

    if ((a[key] as Indexed) === Object(a[key]) && (b[key] as Indexed) === Object(b[key])) {
      return isEqual(a[key] as Indexed, b[key] as Indexed);
    }

    if (a[key] === b[key]) return true;

    return false;
  });
}

export default isEqual;
