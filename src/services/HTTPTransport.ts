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

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

export class HTTPTransport {
  get: HTTPMethod = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options?.timeout,
    );
  };

  put: HTTPMethod = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options?.timeout,
    );
  };

  post: HTTPMethod = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options?.timeout,
    );
  };

  delete: HTTPMethod = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options?.timeout,
    );
  };

  request = (url: string, options: Options = {}, timeout = 5000) => {
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

      if (method === METHODS.GET && Object.keys(data).length) {
        url = `${url}${queryStringify(data)}`;
      }

      xhr.open(method, url);

      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
      }

      xhr.onload = function () {
        resolve(xhr);
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
