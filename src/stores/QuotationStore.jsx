import {observable, action, decorate} from 'mobx';
import fakeData from '../data/sampleData';

class QuotationStore {

    userStore;

    constructor(userStore) {
        this.userStore = userStore;
    }

    searched = null;
    searchedAll = [];

    searchOne(data) {

        let dummyQuotation= {};

        if (data.id) {
            dummyQuotation = fakeData.quotations.find(x => x.id === data.id);
        } else {
            let filter = (data.cnpj || data);
            dummyQuotation = fakeData.quotations.find(x => x.cnpj === filter || x.name === filter);
        }

        return dummyQuotation;

    }

    searchAll(data) {

        let dummyQuotations= [];

        if (data.id) {
            dummyQuotations = fakeData.quotations.filter(x => x.id === data.id)
        } else {
            dummyQuotations = fakeData.quotations.filter(x => x.name === (data.name || data))
        }

        return dummyQuotations;

    }

}

decorate(QuotationStore, {
    searched : observable,
    searchedAll : observable,
    searchOne: action,
    searchAll: action
});

export default QuotationStore;
