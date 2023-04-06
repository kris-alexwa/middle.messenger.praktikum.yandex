enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export enum ContentTypes {
  JSON = 'JSON',
  FORMDATA = 'FormData',
}

type Options = {
    method: METHODS;
    contentType: ContentTypes;
    data?: any;
};

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  get<Response>(url: string): Promise<Response> {
    return this.request(this.endpoint + url);
  }

  post<Response = void>(
    url: string,
    data?: unknown,
    contentType: ContentTypes = ContentTypes.JSON,
  ): Promise<Response> {
    return this.request<Response>(
      this.endpoint + url,
      {
        data,
        method: METHODS.POST,
        contentType,
      },
    );
  }

  put<Response = void>(
    url: string,
    data: unknown,
    contentType: ContentTypes = ContentTypes.JSON,
  ): Promise<Response> {
    return this.request(
      this.endpoint + url,
      {
        data,
        method: METHODS.PUT,
        contentType,
      },
    );
  }

  delete<Response>(
    url: string,
    data: unknown,
    contentType: ContentTypes = ContentTypes.JSON,
  ): Promise<Response> {
    return this.request(
      this.endpoint + url,
      {
        data,
        method: METHODS.DELETE,
        contentType,
      },
    );
  }

  request<Response>(
    url: string,
    options: Options = { method: METHODS.GET, contentType: ContentTypes.JSON },
  ): Promise<Response> {
    const { method, data, contentType } = options;

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

      if (contentType === ContentTypes.JSON) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (contentType === ContentTypes.FORMDATA) {
        xhr.send(data);
        return;
      }

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
