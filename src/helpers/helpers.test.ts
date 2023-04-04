import { expect } from 'chai';
import set from './set';
import { Indexed } from './types';

describe('set helper', () => {
  let obj = {};
  const path = 'a.b';
  const value = 3;

  beforeEach(() => {
    obj = {};
  });

  it('should set a value by path', () => {
    const result = set(obj, path, value) as Indexed;

    expect(result.a.b).to.eq(value);
  });

  it('should return "object" if it is not a object', () => {
    const notObj = '';
    const path = 'a';
    const value = 3;

    const result = set(notObj, path, value) as Indexed;

    expect(result).to.eq(notObj);
  });

  it('should throw new Error if "path" parameter is not a string', () => {
    const notAStringPath = 3;

    const result = () => set({}, notAStringPath, value) as Indexed;

    expect(result).to.throw(Error);
  });

  it('should mutate passed object', () => {
    set(obj, path, value) as Indexed;

    expect(obj).to.haveOwnProperty('a');
  });
});
