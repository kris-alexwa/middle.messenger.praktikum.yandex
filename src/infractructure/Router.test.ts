import sinon from 'sinon';
import { expect } from 'chai';
import RouterBase, { BlockConstructable } from './Router';

describe('Router', () => {
  const originalBack = global.window.history.back;
  const originalForward = global.window.history.forward;

  before(() => {
    global.window.history.back = () => {
      if (typeof window.onpopstate === 'function') {
        window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
      }
    };

    global.window.history.forward = () => {
      if (typeof window.onpopstate === 'function') {
        window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
      }
    };
  });

  after(() => {
    global.window.history.back = originalBack;
    global.window.history.forward = originalForward;
  });

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as BlockConstructable;

  it('use() should return Router instance', () => {
    const res = RouterBase.use('/', BlockMock);

    expect(res).to.eq(RouterBase);
  });

  it('should render a page on history back action', () => {
    RouterBase.use('/', BlockMock).start();

    RouterBase.back();
    expect(getContentFake.callCount).to.eq(1);
  });

  it('should render a page on start', () => {
    RouterBase.use('/', BlockMock).start();

    expect(getContentFake.callCount).to.eq(1);
  });
});
