'use strict';

const StateList = require('./ledger-api/statelist.js');

const ProductRecord = require('./productrecord.js');

class Productlist extends StateList {
    constructor(ctx) {
        super(ctx,'edu.asu.productlist');
        this.use(ProductRecord);
    }

    async addPRecord(precord) {
        return this.addState(precord);
    }

    async getPRecord(precordKey) {
        return this.getState(precordKey);
    }

    async updatePRecord(precord) {
        return this.updateState(precord);
    }

}

module.exports = Productlist;
