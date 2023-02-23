enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type Options = {
    method: METHODS;
    data?: any;
    timeout?: number;
    headers?: any;
};

function queryStringify(data: Options['data']) {
  return `?${Object.entries(data).map((item) => {
    const [key, value] = item;
    if (Array.isArray(value)) {
      const val = value.join(',');
      return `${key}=${val}`;
    }

    return `${key}=${value}`;
  }).join('&')}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
class HTTPTransport {
  get = (url: string, options: Omit<Options, 'method'>): Promise<XMLHttpRequest> => this.request(
    url,
    { ...options, method: METHODS.GET },
    options.timeout,
  );

  post = (url: string, options: Options): Promise<XMLHttpRequest> => this.request(
    url,
    { ...options, method: METHODS.POST },
    options.timeout,
  );

  put = (url: string, options: Options): Promise<XMLHttpRequest> => this.request(
    url,
    { ...options, method: METHODS.PUT },
    options.timeout,
  );

  delete = (url: string, options: Options): Promise<XMLHttpRequest> => this.request(
    url,
    { ...options, method: METHODS.DELETE },
    options.timeout,
  );

  request = (
    url: string,
    options: Options = { method: METHODS.GET },
    timeout: number = 5000,
  ): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
