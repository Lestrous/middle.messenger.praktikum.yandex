import { HTTPTransport } from '../services/HTTPTransport';

export class BaseAPI {
  transport: () => HTTPTransport;

  constructor(path: string) {
    const HTTPTransportInstance = new HTTPTransport(path);
    this.transport = () => HTTPTransportInstance;
  }
}
