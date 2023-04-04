import sinon from 'sinon';
import { expect } from 'chai';
import proxyquire from 'proxyquire';
import type BlockType from './Block';

const eventBusMock = {
  on: sinon.stub(),
  emit: sinon.stub(),
};

const { default: Block } = proxyquire('./Block', {
  './EventBus': {
    EventBus: class {
      emit = eventBusMock.emit;
      on = eventBusMock.on;
    },
  },
}) as { default: typeof BlockType};

describe('Block', () => {
  beforeEach(() => {
    eventBusMock.on.reset();
    eventBusMock.emit.reset();
  });

  class ComponentMock extends Block {}

  it('should fire init event on initialization', () => {
    new ComponentMock({});

    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });

  // it.only('should fire protected componentDidMount on component-did-mount dispatch', () => {
  //   let isCalled = false;
  //
  //   class ComponentMock extends Block {
  //     componentDidMount() {
  //       isCalled = true;
  //     }
  //   }
  //   const component = new ComponentMock({});
  //
  //   component.dispatchComponentDidMount();
  //
  //   expect(isCalled).to.eq(true);
  // });

  it.only('should update props', () => {
    class ComponentMock extends Block {}
    const component = new ComponentMock({
      testProps: '',
    });

    eventBusMock.emit.reset();

    component.setProps({ testProps: 'Test' });

    expect(eventBusMock.emit.calledWith('flow:component-did-update')).to.eq(true);
  });
});
