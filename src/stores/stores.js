
//Stores
import AuthStorex    from '../stores/AuthStore';
import CompanyStorex from '../stores/CompanyStore';
import QuotationStorex from '../stores/QuotationStore';
import ConfigStorex from '../stores/ConfigStore';

// Init store
let AuthStore = new AuthStorex();
let ConfigStore = new ConfigStorex();

let CompanyStore = new CompanyStorex(AuthStore);
let QuotationStore = new QuotationStorex(AuthStore);

// Stores
const stores = {
    AuthStore,
    ConfigStore,
    CompanyStore,
    QuotationStore
};

export default stores;