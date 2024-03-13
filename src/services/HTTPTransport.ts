import { queryStringify } from '../../utils/mydash/queryStringify';

enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type Options = {
  method?: METHODS.GET | METHODS.PUT | METHODS.POST | METHODS.DELETE;
  headers?: { [key: string]: string };
  data?: { [key: string]: unknown };
  timeout?: number;
  withCredentials?: boolean;
  responseType?: XMLHttpRequestResponseType;
};

type HTTPMethod = (urlPart: string, options?: Options) => Promise<unknown>;

export class HTTPTransport {
  requestPath: string = 'https://ya-praktikum.tech/api/v2';
  path: string;

  constructor(path: string) {
    this.path = this.requestPath + path;
  }

  get: HTTPMethod = (urlPart, options) => {
    return this.request(
      urlPart,
      { ...options, method: METHODS.GET },
      options?.timeout,
    );
  };

  put: HTTPMethod = (urlPart, options) => {
    return this.request(
      urlPart,
      { ...options, method: METHODS.PUT },
      options?.timeout,
    );
  };

  post: HTTPMethod = (urlPart, options) => {
    return this.request(
      urlPart,
      { ...options, method: METHODS.POST },
      options?.timeout,
    );
  };

  delete: HTTPMethod = (urlPart, options) => {
    return this.request(
      urlPart,
      { ...options, method: METHODS.DELETE },
      options?.timeout,
    );
  };

  request = (urlPart: string, options: Options = {}, timeout = 60000) => {
    const {
      method = METHODS.GET,
      headers = {},
      data = {},
      withCredentials = true,
      responseType = 'json',
    } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();

      let url = `${this.path}${urlPart}`;

      if (method === METHODS.GET && Object.keys(data).length) {
        url = `${this.path}${urlPart}${queryStringify(data)}`;
      }

      xhr.open(method, url);

      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
      }

      xhr.onload = function () {
        const status = xhr.status || 0;

        if (status >= 200 && status < 300) {
          resolve(xhr);
        } else {
          const message = {
            '0': 'abort',
            '100': 'Information',
            '200': 'Ok',
            '300': 'Redirect failed',
            '400': 'Access error',
            '500': 'Internal server error',
          }[Math.floor(status / 100) * 100];

          reject({ status, reason: xhr.response?.reason || message });
        }
      };

      xhr.onerror = reject;
      xhr.onabort = reject;
      xhr.ontimeout = reject;

      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;
      xhr.responseType = responseType;

      if (method === METHODS.GET || !Object.keys(data).length) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
