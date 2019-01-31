import {observable, action, decorate} from 'mobx';
import fakeData from "../data/sampleData";
import axios from 'axios';

class CompanyStore {

    searched = null;
    searchedAll = [];

    searchOne(datax) {

        console.log('Query with params');
        console.log(datax);
        let cnpj = encodeURIComponent(datax.cnpj);

        console.log('Getting user token');
        let token;

        if (localStorage && localStorage.user) {
            token = JSON.parse(localStorage.user).token;
        }
        console.log(token);

        console.log('Accessing mock api via GET');
        axios.get('/api/v1/dummies/quote/' + cnpj,
            {
                responseType: 'json',
                headers: token ? {'ACCESS-TOKEN': token} : {}
            }
        ).then((data) => {
            console.log('mocked data recovery');
            console.log(data);
        }).catch(function (error) {
            // handle error
            console.log('mocked failed');
            console.log(error);
        });



    }

    searchAll(data) {

        let dummyCompanies= [];

        if (data.id) {
            dummyCompanies = fakeData.companies.filter(x => x.id === data.id)
        } else {
            dummyCompanies = fakeData.companies.filter(x => x.name === (data.name || data))
        }

        return dummyCompanies;

    }

}

decorate(CompanyStore, {
    searched : observable,
    searchedAll : observable,
    searchOne: action,
    searchAll: action
});

export default new CompanyStore();
