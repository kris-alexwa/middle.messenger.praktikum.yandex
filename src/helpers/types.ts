export type PlainObject<T = unknown> = {
  [k in string]: T;
};

export type Indexed<T = any> = {
  [key in string]: T;
};
