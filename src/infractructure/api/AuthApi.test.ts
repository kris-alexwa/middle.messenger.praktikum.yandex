import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { expect } from 'chai';
import type AuthApiType from './AuthApi';
import type BaseApiType from './BaseApi';

const httpTransportMock = {
  get: sinon.stub(),
  post: sinon.stub(),
};

const { default: BaseApi } = proxyquire('./BaseApi', {
  '../../HTTPTransport': {
    default: class {
      get = httpTransportMock.get;
      post = httpTransportMock.post;
    },
  },
}) as { default: typeof BaseApiType};

const { default: AuthApi } = proxyquire('./AuthApi', {
  './BaseApi': {
    default: BaseApi,
  },
}) as { default: typeof AuthApiType};

describe('AuthApi', () => {
  const data = {
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: '',
  };

  it('should call /signup on signup method with passed data', () => {
    const authApi = new AuthApi();

    authApi.signup(data);

    expect(httpTransportMock.post.calledWith('/signup', data)).to.eq(true);
  });

  it('should call /signin on signin method with passed data', () => {
    const authApi = new AuthApi();

    authApi.signin(data);

    expect(httpTransportMock.post.calledWith('/signin', data)).to.eq(true);
  });

  it('should call /logout on logout method', () => {
    const authApi = new AuthApi();

    authApi.logout();

    expect(httpTransportMock.post.calledWith('/logout')).to.eq(true);
  });

  it('should call /user on get method', () => {
    const authApi = new AuthApi();

    authApi.getUser();

    expect(httpTransportMock.get.calledWith('/user')).to.eq(true);
  });
});
