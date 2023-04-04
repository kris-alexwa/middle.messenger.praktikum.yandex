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
  './BaseApi': BaseApi,
}) as { default: typeof AuthApiType};

describe('AuthApi', () => {
  it.only('should call /auth/signup on signup method', () => {
    const authApi = new AuthApi();

    const data = {
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      password: '',
      phone: '',
    };

    authApi.signup(data);

    expect(httpTransportMock.post.calledWith('/signup', data)).to.eq(true);
  });
});
