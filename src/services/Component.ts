import { compile } from 'handlebars';
import { v4 as makeUUID } from 'uuid';

import { isEqual } from '../../utils/mydash/isEqual';
import { EventBus } from './EventBus.js';

interface keywordsInterface {
  ATTRIBUTES: string[];
  EVENTS: string[];
}

type propsType = {
  [key: string]: Component | unknown;
};

type eventPropType = {
  onClick?: CallableFunction;
  onBlur?: CallableFunction;
  onSubmit?: CallableFunction;
};

type eventType = {
  [key: string]: CallableFunction;
};

type childrenType = {
  [key: string]: Component | unknown;
};

type attributesType = {
  className?: string;
  id?: string;
  value?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  href?: string;
  method?: string;
  'aria-label'?: string;
  [key: string]: string | undefined | unknown;
};

export type componentPropsTypes = propsType &
  eventPropType &
  childrenType &
  attributesType;
type componentProxyPropsTypes = propsType | childrenType | attributesType;

// Нельзя создавать экземпляр данного класса
export default class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  static KEYWORDS: keywordsInterface = {
    ATTRIBUTES: [
      'className',
      'id',
      'value',
      'type',
      'name',
      'placeholder',
      'href',
      'method',
      'aria-label',
    ],
    EVENTS: ['onClick', 'onBlur', 'onSubmit'],
  };

  _props: propsType;
  _eventBus: () => EventBus;
  _element!: HTMLElement;
  _meta;
  _id;
  _children: childrenType;
  _events: eventType;
  _attributes: attributesType;
  _setUpdate = false;

  constructor(
    tagName: string = 'div',
    componentProps: componentPropsTypes = {},
  ) {
    const eventBus = new EventBus();

    const { children, props, events, attributes } =
      this._destructProperties(componentProps);

    this._children = this._makePropsProxy<childrenType>(children);

    this._meta = {
      tagName,
      props: props,
    };

    this._id = makeUUID();

    this._props = this._makePropsProxy<propsType>({ ...props, __id: this._id });
    this._attributes = this._makePropsProxy<attributesType>(attributes);

    this._events = this._registerPropEvents(events);

    this._eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  _registerPropEvents({ onClick, onBlur, onSubmit }: eventPropType = {}) {
    const events: eventType = {};

    if (onClick) {
      events['click'] = onClick;
    }

    if (onBlur) {
      events['blur'] = onBlur;
    }

    if (onSubmit) {
      events['submit'] = onSubmit;
    }

    return events;
  }

  _destructProperties(propsAndChildren: componentPropsTypes) {
    const children: childrenType = {};
    const props: propsType = {};
    const events: eventType = {};
    const attributes: attributesType = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.some((item) => item instanceof Component)) {
          children[key] = value;
        } else {
          props[key] = value;
        }
      } else {
        if (value instanceof Component) {
          children[key] = value;
        } else if (Component.KEYWORDS.EVENTS.includes(key)) {
          events[key] = value as CallableFunction;
        } else if (Component.KEYWORDS.ATTRIBUTES.includes(key)) {
          attributes[key] = value as string;
        } else {
          props[key] = value;
        }
      }
    });

    return { children, props, events, attributes };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
    this._addEvents();
    this._addAttributes();
  }

  init() {
    this._createResources();
    this._eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this._children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((childBlock) => {
          if (childBlock instanceof Component) {
            childBlock.dispatchComponentDidMount();
          }
        });
      } else {
        (child as Component).dispatchComponentDidMount();
      }
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this._eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(
    oldProps: componentProxyPropsTypes,
    newProps: componentProxyPropsTypes,
  ) {
    if (!this.componentDidUpdate(oldProps, newProps)) {
      return;
    }

    this._eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(
    oldProps: componentProxyPropsTypes,
    newProps: componentProxyPropsTypes,
  ) {
    return !isEqual(oldProps, newProps);
  }

  setProps = (nextProps: componentPropsTypes) => {
    if (!nextProps) {
      return;
    }

    this._setUpdate = false;

    const oldProps = { ...this._props, ...this._children };

    const { children, props, events, attributes } =
      this._destructProperties(nextProps);

    if (Object.values(children).length) {
      Object.assign(this._children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this._props, props);
    }

    if (Object.values(attributes).length) {
      Object.assign(this._attributes, attributes);
      this._addAttributes();
    }

    if (Object.values(events).length) {
      this._removeEvents();
      Object.assign(this._events, this._registerPropEvents(events));
      this._addEvents();
    }

    if (this._setUpdate) {
      this._eventBus().emit(Component.EVENTS.FLOW_CDU, oldProps, {
        ...this._props,
        ...this._children,
      });
      this._setUpdate = false;
    }
  };

  get element(): HTMLElement {
    return this._element;
  }

  _render() {
    const component = this.render();

    this._element.innerHTML = ''; // удаляем предыдущее содержимое

    this._element.appendChild(component);
  }

  // Переопределяется пользователем. Необходимо вернуть разметку
  render(): Node {
    return this._element;
  }

  getContent(): HTMLElement {
    return this.element;
  }

  _makePropsProxy<T extends componentProxyPropsTypes>(props: T): T {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    // Здесь вам предстоит реализовать метод
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        if (!isEqual(target[prop], value)) {
          target[prop] = value;
          self._setUpdate = true;
        }

        return true;
      },
      deleteProperty() {
        throw new Error('Нет прав');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  _addAttributes() {
    const { className, ...restAttributes } = this._attributes;

    if (className) {
      this._element.className = className as string;
    }

    Object.entries(restAttributes).forEach(([key, value]) => {
      if (!value) {
        return;
      }

      this._element.setAttribute(key, value as string);
    });
  }

  _addEvents() {
    Object.keys(this._events).forEach((eventName) => {
      this._element.addEventListener(
        eventName,
        this._events[eventName] as EventListenerOrEventListenerObject,
      );
    });
  }

  _removeEvents() {
    Object.keys(this._events).forEach((eventName) => {
      this._element.removeEventListener(
        eventName,
        this._events[eventName] as EventListenerOrEventListenerObject,
      );
    });
  }

  compile(template: string, props: propsType) {
    const propsAndStubs = { ...props };

    const childArrays: {
      [key: string]: string;
    } = {};

    Object.entries(this._children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        childArrays[key] = makeUUID();
        propsAndStubs[key] = `<div data-id="${childArrays[key]}"></div>`;
        return;
      }

      propsAndStubs[key] = `<div data-id="${(child as Component)._id}"></div>`;
    });

    const fragment: HTMLTemplateElement = this._createDocumentElement(
      'template',
    ) as HTMLTemplateElement;

    fragment.innerHTML = compile(template)(propsAndStubs);

    Object.entries(this._children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        const stub = fragment.content.querySelector(
          `[data-id="${childArrays[key]}"]`,
        );
        const arrayItems: (Node | string)[] = [];

        child.forEach((arrayItem) => {
          if (arrayItem instanceof Component) {
            arrayItems.push(arrayItem.getContent());
          } else {
            arrayItems.push(arrayItem as string);
          }
        });

        if (stub) {
          stub.replaceWith(...arrayItems);
        }
      } else {
        const stub = fragment.content.querySelector(
          `[data-id="${(child as Component)._id}"]`,
        );

        if (stub) {
          stub.replaceWith((child as Component).getContent());
        }
      }
    });

    return fragment.content;
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
