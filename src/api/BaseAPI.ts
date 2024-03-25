import { HTTPTransport } from '../services/HTTPTransport';

export type FormDataEntryValueType = FormDataEntryValue | null;

export class BaseAPI {
  transport: () => HTTPTransport;

  constructor(path: string) {
    const HTTPTransportInstance = new HTTPTransport(path);
    this.transport = () => HTTPTransportInstance;
  }
}
