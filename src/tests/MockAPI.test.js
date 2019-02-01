import React from 'react';
import * as m from '../data/mockAPI';
import AuthStore from "../stores/AuthStore";
import CompanyStore from "../stores/CompanyStore";


describe('Mock API', () => {

    let authStorex = new AuthStore();
    authStorex.doFakeLogin();

    let companyStorex = new CompanyStore(authStorex);

    it('Assemble any responde to API', () => {
        let u = authStorex.getInfo({id: 1});
        const ar = m.assembleResponse(200, u);
        expect(ar[2]).toBe(JSON.stringify(u));
    });

    describe('fetch a request to get user data', () => {

        it ('retrive a user by id', () => {
            const user = m.requestUserGetInfo({params : {id: 1}});
            expect(user[0]).toBe(200);
            expect(user[2]).toBe(JSON.stringify(authStorex.getInfo({id: 1})));
        });

        it ('retrive a user by name', () => {
            const user = m.requestUserGetInfo({params : {name: 'Developer'}});
            expect(user[0]).toBe(200);
            expect(user[2]).toBe(JSON.stringify(authStorex.getInfo({id: 2})));
        });

        it ('return an empty user if not founded', () => {
            const user = m.requestUserGetInfo({params: {id: 123}});
            let e = JSON.stringify(m.dummyError('USER_NOT_FOUND','Usuário não encontrado.', 404));
            expect(user[2]).toBe(e);
        });

    });

    describe('fetch a request to get company searched by cnpj', () => {

        const headers = {requestHeaders: {Authorization: 'ACCESS-TOKEN 23456789'}};
        const fakeHeaders = {requestHeaders: {Authorization: 'ACCESS-TOKEN 11223344'}};

        it ('validates header token', () => {
            const q = m.requestQuoteSearch({params: {id: 1}});
            let e = JSON.stringify(m.dummyError('USER_NOT_FOUND','Usuário não autenticado.', 401));
            expect(q[2]).toBe(e);
        });

        it ('validates token against base', () => {
            const q = m.requestQuoteSearch({params: {id: 1}, ...fakeHeaders});
            let e = JSON.stringify(m.dummyError('USER_TOKEN_NOT_FOUND','Token inválido ou expirado.', 403));
            expect(q[2]).toBe(e);
        });

        it ('retrive a company by id', () => {
            const q = m.requestQuoteSearch({params : {id: 1}, ...headers});
            expect(q[0]).toBe(200);
            expect(q[2]).toBe(JSON.stringify(companyStorex.getInfo({id: 1})));
        });

        it ('retrive a company by name', () => {
            const q = m.requestQuoteSearch({params : {cnpj: '12.345.678/0001-23'}, ...headers});
            expect(q[0]).toBe(200);
            expect(q[2]).toBe(JSON.stringify(companyStorex.getInfo({id: 3})));
        });

        it ('return an empty company if not founded', () => {
            const q = m.requestQuoteSearch({params: {id: 123}, ...headers});
            let e = JSON.stringify(m.dummyError('COMPANY_NOT_FOUND','Empresa não encontrada.', 404));
            expect(q[2]).toBe(e);
        });

    });

});
