import fakeData from "./sampleData";
import {SERVER_ERROR, USER_TOKEN_NOT_FOUND, USER_NOT_FOUND, COMPANY_NOT_FOUND} from './constants';
import {Server, Faker} from 'react-mock';

const endPoint = '/api/v1/dummies/';

const dummyError = (tag, msg, code)  => {
  return {
      error: {
          code: code || 500,
          msg: msg || 'Falha no serviço',
          tag: tag || SERVER_ERROR
      }
  }
};

// Validates headers and extract token A
const validateAuthHeaderToken = (headers) => {

    let token;

    if (headers && headers.Authorization) {
        let regex = /^ACCESS-TOKEN\s(\w{8})$/g;
        let matches = regex.exec(headers.Authorization);

        console.log('Retrieving access token from headers');
        console.log(matches);
        if (matches && matches[1]) {
            token = matches[1];
        }
    }

    return token;

};

// Assemble mock response
const assembleResponse = (code, data, headers) => {

    console.log('Data before encoding is: ');
    console.log('Code: ' + code + ' and Data is: ');
    console.log(data);

    let header = {'Content-Type': 'application/json'};
    if (headers) {
        header = Object.assign({}, header, headers);
    }

    return [200, header, JSON.stringify(data)];
};

//dummy api busca usuario
const requestUserGetInfo = (datax) => {

    let dummyUser = null;

    console.log('Object mock api with params');
    console.log(datax.params);

    let data = datax.params;

    if (data.id) {
        console.log('Get user by ID');
        console.log(data.id);
        dummyUser = fakeData.users.find(x => parseInt(x.id) === parseInt(data.id)) || null
    } else {
        let filter = data.name || data;
        console.log('Filter for search in fake data is:');
        console.log(filter);
        dummyUser = fakeData.users.find(x => x.name === filter) || null
    }

    console.log('Result from find in dummy data');
    console.log(dummyUser);

    if (dummyUser && dummyUser.id) {
        return assembleResponse(200, dummyUser);
    } else {
        return assembleResponse(404, dummyError(USER_NOT_FOUND,'Usuário não encontrado.', 404));
    }

};

//dummy api busca de empresa
const requestQuoteSearch = (datax) => {

    let response;

    console.log('Object mock api with params');
    console.log(datax.params);

    let data = datax.params;
    let headers = datax.requestHeaders;

    let token = validateAuthHeaderToken(headers);
    console.log('Validate accessToken in header');
    console.log(headers);

    if (!token) {
        response = assembleResponse(401, dummyError(USER_NOT_FOUND,'Usuário não autenticado.', 401));
        console.log('Dispatching response: ');
        console.log(response);
        return response;
    }

    console.log('Check if exists user with token');
    console.log(token);
    let tokenUser = fakeData.users.find(x => x.token === token);

    if (!tokenUser) {
        response = assembleResponse(403, dummyError(USER_TOKEN_NOT_FOUND,'Token inválido ou expirado.', 403));
        console.log('Dispatching response: ');
        console.log(response);
        return response;
    }

    let dummyCompany = null;

    if (data.id) {
        dummyCompany = fakeData.companies.find(x => parseInt(x.id) === parseInt(data.id)) || null;
    } else {
        let filter = data.name || data.cnpj || data;
        console.log('Filter for search in fake data is:');
        console.log(filter);
        dummyCompany = fakeData.companies.find(x => x.name === filter || x.cnpj === filter) || null;
    }

    console.log('Result from find in dummy data');
    console.log(dummyCompany);

    if (dummyCompany && dummyCompany.id) {
        response = assembleResponse(200, dummyCompany);
    } else {
        response = assembleResponse(404, dummyError(COMPANY_NOT_FOUND,'Empresa não encontrada.', 404));
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
};

const serveMock = () => {
    Server.mockGet(endPoint + '/user/:id', requestUserGetInfo);
    Server.mockGet(endPoint + '/quote/:cnpj', requestQuoteSearch);
    Server.mockGet(endPoint + '/test', requestHandler);
    Server.on();
};

export default serveMock;
