import { merge } from './merge';

type Indexed<T = unknown> = {
  [key in string]: T;
};

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') return new Error('path must be string');

  if (object !== Object(object)) {
    return object;
  }
  const keys = path.split('.');
  const newObj = keys.reduceRight((acc: any, key: string, index: number) => {
    if (index === keys.length - 1) {
      acc[key] = value;
    } else {
      const res: Indexed = {};
      res[key] = acc;
      acc = res;
    }

    return acc;
  }, {});

  return merge((object as Indexed), newObj);
}
