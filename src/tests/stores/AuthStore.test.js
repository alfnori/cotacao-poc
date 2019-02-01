import {observe, configure, spy} from 'mobx';
import AuthStore from '../../stores/AuthStore';
import axios from 'axios';
import _ from 'lodash';

describe('AuthStore', () => {

  let AuthStorex;

  beforeEach(() => {
    configure(false);
  });

  it('invalidade session', () => {
    AuthStorex = new AuthStore();
    AuthStorex.isLogged = true;
    AuthStorex.doLogout();
    expect(AuthStorex.isLogged).toBe(false);
  });

  it('validade session', () => {
      AuthStorex = new AuthStore();
      AuthStorex.isLogged = true;
      expect(AuthStorex.checkAuth).toBe(true);
  });

  it('fetchs dummy data', () => {
    AuthStorex = new AuthStore();
    let user = AuthStorex.getInfo({id: 2});
    expect(user).not.toBe(null);
    expect(user.name).toBe('Developer');
    let quote2 = AuthStorex.getInfo({name: 'xyz'});
    expect(quote2).toBe(null);
  });

  it('can create an user', () => {

    AuthStorex = new AuthStore();

    const obj = AuthStorex.createUser({id: 1, name: 'mock', token: 'mock'});
    expect(obj.id).toBe(1);
    expect(obj.name).toBe('mock');
    expect(obj.token).toBe('mock');

  });

  it('makes user observable', () => {

    AuthStorex = new AuthStore();

    let isObserved = false;
    const observation = observe(AuthStorex, (changes) => {
      isObserved = true;
    });

    AuthStorex.user = {};
    expect(isObserved).toEqual(true);
    AuthStorex.user = null;

  });

  describe('AuthStore Actions Login', () => {

    let promiseHelper,
        promisePostHelper,
        promiseDeleteHelper;

    beforeEach(() => {
      const fakePromise = new Promise((resolve, reject) => {
        promiseHelper = {
          resolve: resolve
        }
      });
      spyOn(axios, 'get').and.returnValue(fakePromise);

    });

    describe('AuthStore and actions', () => {

      it('Do a fake login and get user', () => {
        AuthStorex = new AuthStore();
        AuthStorex.doFakeLogin();
        expect(axios.get).toHaveBeenCalledWith('/api/v1/dummies/user/' + AuthStorex.dummyId);
      });

      describe('when fetch is successful', () => {
        it('assigns the response from the api to the store user', (done) => {
          AuthStorex = new AuthStore();
          AuthStorex.doFakeLogin();
          promiseHelper.resolve({data: {id: 1, name: 'xyz'}});
            _.defer(() => {
              expect(AuthStorex.user).not.toBe(null);
              done();
          });
        });

        describe('fetch response is empty', () => {
          it('sets the currentId to 0', (done) => {
            AuthStorex = new AuthStore();
            AuthStorex.doFakeLogin();
            promiseHelper.resolve({data: {error: {code: 404}}});
            _.defer(() => {
              expect(AuthStorex.user).toEqual(null);
              done();
            });
          });
        });
      });
   });
});
});