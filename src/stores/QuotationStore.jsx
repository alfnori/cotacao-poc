import {observable, action, decorate} from 'mobx';
import fakeData from '../data/sampleData';

class QuotationStore {

    userStore;
    quotation;

    constructor(userStore) {
        this.userStore = userStore;
    }

    searchOne(data) {

        let dummyQuotation = null;

        if (data.id) {
            dummyQuotation = fakeData.quotations.find(x => x.id === data.id) || null;
        } else {
            let filter = (data.cnpj || data);
            dummyQuotation = fakeData.quotations.find(x => x.cnpj === filter || x.name === filter) || null;
        }

        return dummyQuotation;

    }

}

decorate(QuotationStore, {
    quotation: observable,
    searchOne: action
});

export default QuotationStore;
