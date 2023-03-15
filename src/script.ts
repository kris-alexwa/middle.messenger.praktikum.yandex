enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type Options = {
    method: METHODS;
    data?: any;
};

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  get = (url: string): Promise<XMLHttpRequest> => this.request(
    this.endpoint + url,
  );

  post = (url: string, data?: unknown): Promise<XMLHttpRequest> => this.request(
    this.endpoint + url,
    {
      data,
      method: METHODS.POST,
    },
  );

  put = (url: string, data: unknown): Promise<XMLHttpRequest> => this.request(
    this.endpoint + url,
    { data, method: METHODS.PUT },
  );

  delete = (url: string, data: unknown): Promise<XMLHttpRequest> => this.request(
    this.endpoint + url,
    { data, method: METHODS.DELETE },
  );

  request = (
    url: string,
    options: Options = { method: METHODS.GET },
  ): Promise<XMLHttpRequest> => {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
