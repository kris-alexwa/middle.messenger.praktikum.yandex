import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { expect } from 'chai';
import type AuthApiType from '../api/AuthApi';
import type BaseApiType from '../api/BaseApi';
import type AuthControllerType from './AuthController';
import { SignupData } from '../api/types';
import Router from '../Router';
//
// const callback = sinon.stub();

const httpTransportMock = {
  get: sinon.stub(),
  post: sinon.stub(),
};

const state = {};
const storeMock = {
  set: sinon.stub(),
  getState: () => state,
};

const route = '';
// @ts-ignore
const router = { go: route } as typeof Router;

const { default: BaseApi } = proxyquire('../api/BaseApi', {
  '../../HTTPTransport': {
    default: class {
      get = httpTransportMock.get;
      post = httpTransportMock.post;
    },
  },
}) as { default: typeof BaseApiType};

const { default: AuthApi } = proxyquire('../api/AuthApi', {
  '../api/BaseApi': {
    default: BaseApi,
  },
}) as { default: typeof AuthApiType};

const { default: AuthController } = proxyquire('./AuthController', {
  '../api/AuthApi': {
    default: AuthApi,
  },
  '../Store': {
    Store: class {
      set = storeMock.set;
      getState = storeMock.getState();
    },
  },
  '../Router': {
    default: router,
  },
}) as { default: typeof AuthControllerType};

describe('AuthController', () => {
  const data: SignupData = {
    first_name: 'test',
    second_name: 'test',
    login: 'test',
    email: 'test',
    password: 'test',
    phone: 'test',
  };

  describe('signup method', () => {
    it('should call api.signup method with passed data', () => {
      AuthController.signup(data);

      expect(httpTransportMock.post.calledWith('/signup', data)).to.eq(true);
    });

    it('should call api.getUser', () => {
      AuthController.signup(data);

      expect(httpTransportMock.get.calledWith('/user')).to.eq(true);
    });
  });

  describe('signin method', () => {
    it('should call api.signin method with passed data', () => {
      AuthController.signin(data);

      expect(httpTransportMock.post.calledWith('/signin', data)).to.eq(true);
    });

    it('should call api.getUser', () => {
      AuthController.signin(data);

      expect(httpTransportMock.get.calledWith('/user')).to.eq(true);
    });
  });

  describe('logout method', () => {
    it('should call api.logout method', () => {
      AuthController.logout();

      expect(httpTransportMock.post.calledWith('/logout')).to.eq(true);
    });
  });
});
