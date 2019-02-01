import {observe, configure, spy} from 'mobx';
import CompanyStore from '../../stores/CompanyStore';
import axios from 'axios';
import _ from 'lodash';
import AuthStore from "../../stores/AuthStore";

describe('CompanyStore', () => {

  let CompanyStorex;

  beforeEach(() => {
    configure(false);
  });

  it('can create an company', () => {

    CompanyStorex = new CompanyStore();

    const obj = CompanyStorex.createCompany({id: 1, name: 'mock', cnpj: 'mock'});
    expect(obj.id).toBe(1);
    expect(obj.name).toBe('mock');
    expect(obj.cnpj).toBe('mock');

  });

  it('makes company observable', () => {

    CompanyStorex = new CompanyStore();

    let isObserved = false;
    const observation = observe(CompanyStorex, (changes) => {
      isObserved = true;
    });

    CompanyStorex.company = {};
    expect(isObserved).toEqual(true);
    CompanyStorex.company = null;

  });

  describe('CompanyStore Actions Login', () => {

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

    describe('CompanyStore and actions', () => {

      let cnpj = '12.345.678/0001-23';

      it('Can search for an cnpj', () => {
        CompanyStorex = new CompanyStore(new AuthStore());
        let user = CompanyStorex.userStore.user = CompanyStorex.userStore.getInfo({id:1});
        let header = {"headers": {"Authorization": "ACCESS-TOKEN " + user.token}};
        CompanyStorex.searchOne({cnpj: cnpj});
        expect(axios.get).toHaveBeenCalledWith('/api/v1/dummies/quote/' + encodeURIComponent(cnpj), header);
      });

      describe('when fetch is successful', () => {
        it('assigns the response from the api to the store company', (done) => {
          CompanyStorex = new CompanyStore(new AuthStore());
          CompanyStorex.userStore.user = CompanyStorex.userStore.getInfo({id:1});
          CompanyStorex.searchOne({cnpj: cnpj});
          promiseHelper.resolve({data: {id: 1, cnpj: cnpj, name: 'abc'}});
            _.defer(() => {
              expect(CompanyStorex.company).not.toBe(null);
              done();
          });
        });

        describe('when company is not founded', () => {
          it('sets send custom error 404', (done) => {
            CompanyStorex = new CompanyStore(new AuthStore());
            CompanyStorex.userStore.doFakeLogin();
            CompanyStorex.searchOne({cnpj: 'xyz'});
            promiseHelper.resolve({data: {error: {code: 404}}});
            _.defer(() => {
              expect(CompanyStorex.company).toEqual(null);
              done();
            });
          });
        });

        describe('fetch response is empty', () => {
          it('sets the currentId to 0', (done) => {
            CompanyStorex = new CompanyStore(new AuthStore());
            CompanyStorex.userStore.doFakeLogin();
            CompanyStorex.searchOne({cnpj: cnpj});
            promiseHelper.resolve({data: []});
            _.defer(() => {
              expect(CompanyStorex.company).toEqual(null);
              done();
            });
          });
        });
      });
   });
});
});