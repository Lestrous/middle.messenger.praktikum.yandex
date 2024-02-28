import Component from '../services/Component';

export function render(query: string, component: Component): HTMLElement {
  const root = document.querySelector(query) as HTMLElement;

  // Можно завязаться на реализации вашего класса Component
  root.appendChild(component.getContent());

  component.dispatchComponentDidMount();

  return root;
}
