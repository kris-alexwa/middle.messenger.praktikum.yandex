import { nanoid } from 'nanoid';
import { TemplateDelegate } from 'handlebars';
import { EventBus } from './EventBus';

export default class Block<P extends Record<string, any> = any,
    E extends HTMLElement = HTMLElement> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id = nanoid(6);
  protected props: P;
  public children: Record<string, Block | Array<Block>>;
  private eventBus: () => EventBus;
  private _element: E | null = null;
  private _meta: { props: any };

  constructor(propsWithChildren: P = {} as P) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this._meta = {
      props,
    };

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  get element() {
    return this._element as E;
  }

  _getChildrenAndProps(childrenAndProps: P) {
    const props: P = {} as P;
    const children: Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.every((element) => element instanceof Block)) {
        children[key] = value;
      } else if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key as keyof P] = value;
      }
    });

    return { props, children };
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });

    if (this.props.eventsBySelector) {
            type event = {
                selector: string;
                eventName: string;
                handler: () => void;
            };
            const { eventsBySelector = [] } = this.props;

            eventsBySelector.forEach(({ selector, eventName, handler }: event) => {
              this._element?.querySelector(selector)?.addEventListener(eventName, handler);
            });
    }
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((item) => item.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: P, newProps: P) {
    // console.log(this.props)
    // console.log(this.element)
    // if (newProps) {
    //   const res: boolean = Object.entries(oldProps).every(([keyOld, valueOld]) => {
    //     return Object.entries(newProps).forEach(([keyNew, valueNew]) => {
    //       return keyOld === keyNew && valueOld === valueNew;
    //     });
    //   });
    //
    //   if (res) {
    //     return true;
    //   }
    // }

    return true;
  }

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  private _render() {
    const fragment = this.render();
    const fragmentElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(fragmentElement);
    }

    this._element = fragmentElement as E;
    this._addEvents();
  }

  private _replaceContent(temp, item) {
    const stub = temp.content.querySelector(`[data-id="${item.id}"]`);

    if (!stub) {
      return;
    }

    item.getContent()?.append(...Array.from(stub.childNodes));

    stub.replaceWith(item.getContent()!);
  }

  protected compile(template: TemplateDelegate, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map((item) => `<div data-id="${item.id}"></div>`);
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');
    temp.innerHTML = html;

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach((item) => {
          this._replaceContent(temp, item);
        });
      } else {
        this._replaceContent(temp, component);
      }
    });

    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: P) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof P];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };
        target[prop as keyof P] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  show() {
        this.getContent()!.style.display = 'block';
  }

  hide() {
        this.getContent()!.style.display = 'none';
  }
}
