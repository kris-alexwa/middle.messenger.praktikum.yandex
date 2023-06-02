import sinon from 'sinon';
import { expect } from 'chai';
import HTTPTransport from './HTTPTransport';

describe('HTTPTransport class', () => {
  let requests: sinon.SinonFakeXMLHttpRequest[] = [];
  let transport = new HTTPTransport('/');

  const originalXHR = global.XMLHttpRequest;

  before(() => {
    transport = new HTTPTransport('/');
    const XHR = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = XHR;

    XHR.onCreate = function (xhr) {
      requests.push(xhr);
    };
  });

  beforeEach(() => {
    requests = [];
  });

  after(() => {
    global.XMLHttpRequest = originalXHR;
  });

  describe('get method', () => {
    it('should make GET request', () => {
      const transport = new HTTPTransport('/');

      transport.get('/');

      expect(requests[0].method).to.eq('GET');
    });
  });

  describe('post method', () => {
    it('should make POST request', () => {
      const transport = new HTTPTransport('/');

      transport.post('/');

      expect(requests[0].method).to.eq('POST');
    });

    it('should make POST request with passed parameters', () => {
      const data = { title: '' };

      transport.post('/', data);

      expect(requests[0].requestBody).to.eq(JSON.stringify(data));
    });
  });

  describe('put method', () => {
    it('should make PUT request', () => {
      const transport = new HTTPTransport('/');

      transport.put('/', {});

      expect(requests[0].method).to.eq('PUT');
    });

    it('should make PUT request with passed parameters', () => {
      const data = { users: [{}, {}] };

      transport.post('/', data);

      expect(requests[0].requestBody).to.eq(JSON.stringify(data));
    });
  });

  describe('delete method', () => {
    it('should make DELETE request', () => {
      const transport = new HTTPTransport('/');

      transport.delete('/', {});

      expect(requests[0].method).to.eq('DELETE');
    });

    it('should make DELETE request with passed parameters', () => {
      const data = { id: 1 };

      transport.post('/', data);

      expect(requests[0].requestBody).to.eq(JSON.stringify(data));
    });
  });
});
