type Indexed<T = unknown> = {
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed) {
  if (lhs == null) {
    return rhs;
  }

  if (rhs == null) {
    return lhs;
  }

  if ((rhs !== Object(rhs))) {
    return rhs;
  }

  const keys = [...Object.keys(lhs), ...Object.keys(rhs)];

  keys.forEach((key) => {
    lhs[key] = merge((lhs[key] as Indexed), (rhs[key] as Indexed));
  });

  return lhs;
}
