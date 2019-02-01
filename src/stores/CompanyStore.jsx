import {observable, action, decorate} from 'mobx';
import fakeData from "../data/sampleData";
import axios from 'axios';
import CustomError from '../utils/CustomError';

class Company {

    constructor(company) {
        this.id = company.id ;
        this.name = company.name;
        this.cnpj = company.cnpj;
    }

}

class CompanyStore {

    userStore;
    company = null;

    constructor(userStore) {
        this.userStore = userStore;
    }


    createCompany = (params) => {
        return new Company({...params});
    };

    async searchOne(datax) {

        let instance = this;

        console.log('Query with params');
        console.log(datax);

        console.log('Getting user token');
        let token;
        if (this.userStore && this.userStore.user) {
            token = this.userStore.user.token;
        }
        console.log(token);

        let cnpj = encodeURIComponent(datax.cnpj);
        console.log('Accessing mock api via GET');
        console.log('Looking for company with CNPJ: ' + datax.cnpj);

        let config = null;
        if (token) {
            config = {
                headers: {'Authorization': 'ACCESS-TOKEN ' + token}
            }
        };

        return await axios.get('/api/v1/dummies/quote/' + cnpj,
            config
        )
        .then((response) => {
            console.log('xxxxxxxxxxxxxxxxxxxxxx');console.log(response);
            if (!response.data || !response.data.id && !response.data.error) {
                throw new Error('No data response');
            } else if (response.data.error) {
                throw new CustomError(response.data.error);
            }
            return response;
        })
        .then((data) => {
            console.log('mocked data recovery');
            console.log(data);
            let company = new Company(data.data);
            instance.company = company;
            console.log('Company info is');
            console.log(company);
            return company;
        }).catch(function (error) {
            // handle error
            console.log('mocked failed');
            console.log(error);
            if (error instanceof CustomError) {
                console.log('Code: ' + error.code);
                console.log('Tag: ' + error.tag);
            }
            instance.company = null;
            return error;
        });

    }

}

decorate(CompanyStore, {
    company : observable,
    searchOne: action
});

export default CompanyStore;
