export class EventBus {
  listeners: { [key: string]: CallableFunction[] };

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: CallableFunction): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: CallableFunction): void {
    this._checkEventExistence(event);

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: string, ...args: unknown[]): void {
    this._checkEventExistence(event);

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }

  _checkEventExistence(event: string) {
    if (!Object.prototype.hasOwnProperty.call(this.listeners, event)) {
      throw new Error(`Нет события: ${event}`);
    }
  }
}
