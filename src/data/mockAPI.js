import fakeData from "./sampleData";
import {SERVER_ERROR, USER_NOT_FOUND, COMPANY_NOT_FOUND} from './constants';
import { Server, Faker, uid } from 'react-mock';

const endPoint = '/api/v1/dummies/';

const dummyError = (tag, msg, code)  => {
  return {
      errorCode: code || 500,
      errorMsg: msg || 'Falha no serviço',
      errorTag: tag || SERVER_ERROR
  }
};

//dummy api busca usuario
const requestUserGetInfo = (datax) => {

    let dummyUser = {};

    console.log('Object mock api with params');
    console.log(datax.params);

    let data = datax.params;

    if (data.id) {
        dummyUser = fakeData.users.find(x => x.id === data.id)
    } else {
        let filter = data.name || data;
        console.log('filter is')
        console.log(filter);
        dummyUser = fakeData.users.find(x => x.name === filter)
    }

    console.log('Result from find in dummy data');
    console.log(dummyUser)

    if (dummyUser && dummyUser.id) {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify(dummyUser)];
    } else {
        return [404, { 'Content-Type': 'application/json' }, JSON.stringify(dummyError(USER_NOT_FOUND,'Usuário não encontrado.', 404))];
    }


};

//dummy api busca de empresa
const requestQuoteSearch = (datax) => {

    let response;

    console.log('Object mock api with params');
    console.log(datax.params);

    let data = datax.params;
    let headers = datax.requestHeaders;

    let token = headers && headers['ACCESS-TOKEN'] ? headers['ACCESS-TOKEN'] : '';
    console.log('Validate accessToken in header');
    console.log(headers);

    if (!token) {
        response = [402, { 'Content-Type': 'application/json' }, JSON.stringify(dummyError(COMPANY_NOT_FOUND,'Usuário não autenticado.', 402))];
        console.log('Dispatching response: ');
        console.log(response);
        return response;
    }

    console.log('Check if exists user with token')
    console.log(token);
    let tokenUser = fakeData.users.find(x => x.token === token);

    if (!tokenUser) {
        response = [401, { 'Content-Type': 'application/json' }, JSON.stringify(dummyError(COMPANY_NOT_FOUND,'Token inválido ou expirado.', 401))];
        console.log('Dispatching response: ');
        console.log(response);
        return response;
    }

    let dummyCompany = {};

    if (data.id) {
        dummyCompany = fakeData.companies.find(x => x.id === data.id);
    } else {
        let filter = data.name || data.cnpj || data;
        console.log('Filter for search in fake data is:')
        console.log(filter);
        dummyCompany = fakeData.companies.find(x => x.name === filter || x.cnpj === filter);
    }

    console.log('Result from find in dummy data');
    console.log(dummyCompany)

    if (dummyCompany && dummyCompany.id) {
        response = [200, { 'Content-Type': 'application/json' }, JSON.stringify(dummyCompany)];
    } else {
        response = [404, { 'Content-Type': 'application/json' }, JSON.stringify(dummyError(COMPANY_NOT_FOUND,'Empresa não encontrada.', 404))];
    }

    console.log('Dispatching response: ');
    console.log(response);
    return response;

};

// test mock
const todoSchema = {
    author: Faker.internet.email(),
    content: () => Faker.lorem.sentence(),
    createdAt: () => Faker.date.past()
}

const requestHandler = (request, generator) => {
    const todoList = generator.next(10, todoSchema);
    return [200, { 'Content-Type': 'application/json' }, JSON.stringify(todoList)];
}

const serveMock = () => {
    Server.mockGet(endPoint + '/user/get-info', requestUserGetInfo);
    Server.mockGet(endPoint + '/quote/:cnpj', requestQuoteSearch);
    Server.mockGet(endPoint + '/test', requestHandler);
    Server.on();
};

export default serveMock;
