'use strict';

const State = require('./ledger-api/state.js');

class ProductRecord extends State {

    constructor(obj) {
        super(ProductRecord.getClass(),[obj.productId, obj.name]);
        Object.assign(this,obj);
    }

    //Helper Functions for reading and writing attributes
    getProductID() { return this.productId }
    setProductID(newProductId) { return this.productId=newProductId }
    getName() { return this.name }
    setName(newName) { return this.name=newName }
    getmfg_date() { return this.mfg_date }
    setmfg_date(newmfg_date) { return this.mfg_date=newmfg_date }


    getproducttype() { return this.productType }
    setproducttype(newproducttype) { return this.productType=newproducttype }

    //TASK 2 - Write a getter and a setter for a field called quantity
    // GRADED FUNCTIONS
    //Helper functions

    static fromBuffer(buffer) {
        return ProductRecord.deserialize(Buffer.from(JSON.parse(buffer)));
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    static deserialize(data) {
        return State.deserializeClass(data, ProductRecord);
    }

    static createInstance(productId, name, mfg_date, productType) {
        return new ProductRecord({productId, name, mfg_date, productType});
    }

    static getClass() {
        return 'edu.asu.productrecord';
    }


}

module.exports = ProductRecord;
