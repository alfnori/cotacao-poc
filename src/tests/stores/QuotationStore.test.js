import {observe, configure} from 'mobx';
import QuotationStore from '../../stores/QuotationStore';

describe('QuotationStore', () => {

  let QuotationStorex;

  beforeEach(() => {
    configure(false);
  });

  it('makes Quotation observable', () => {

    QuotationStorex = new QuotationStore();

    let isObserved = false;
    const observation = observe(QuotationStorex, (changes) => {
      isObserved = true;
    });

    QuotationStorex.quotation = {};
    expect(isObserved).toEqual(true);
    QuotationStorex.quotation = null;

  });

  it('fetchs dummy data', () => {
    QuotationStorex = new QuotationStore();
    let quote = QuotationStorex.searchOne({id: 2});
    expect(quote).not.toBe(null);
    expect(quote.name).toBe('Dummy');
    let quote2 = QuotationStorex.searchOne({name: 'xyz'});
    expect(quote2).toBe(null);
  });

});