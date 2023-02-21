type TypeFunction = () => void;

export default class EventBus {
  private readonly listeners: Record<string, Array<TypeFunction>> = {};

  on(event, callback: TypeFunction) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event, callback: TypeFunction) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event, ...args: Array<any>) {
    if (!this.listeners[event]) {
      throw new Event(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      // @ts-ignore
      listener(...args);
    });
  }
}
