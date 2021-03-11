/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';
const { Contract, Context } = require('fabric-contract-api');
const ProductRecord = require('./productrecord.js');
const ProductList = require('./productlist.js');


class ProductRecordContext extends Context {

    constructor() {
        super();
        this.productList = new ProductList(this);
    }

}

/**
 * Define product record smart contract by extending Fabric Contract class
 *
 */
class Productcontract extends Contract {

    constructor() {
        super('edu.asu.productcontract');
    }

    /**
     * Define a custom context for commercial paper
    */
    createContext() {
        return new ProductRecordContext();
    }

    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async init(ctx) {
        console.log('Instantiated the product record smart contract.');
    }

    //  TASK-7: Implement the unknownTransaction to throw an error when
    //  a function is called that does not exist in the contract.
    //  The error message should be: 'Function name missing'.
    //  Read more about unknownTransaction here: https://hyperledger.github.io/fabric-chaincode-node/master/api/fabric-contract-api.Contract.html

    async unknownTransaction(ctx){
        //GRADED FUNCTION
        throw new Error()
    }


    async afterTransaction(ctx){
        console.log('---------------------INSIDE afterTransaction-----------------------')
        let func_and_params = ctx.stub.getFunctionAndParameters()
        console.log('---------------------func_and_params-----------------------')
        console.log(func_and_params)
        console.log(func_and_params['fcn'] === 'createProductRecord' && func_and_params['params'][4]==='AB-')
        if (func_and_params['fcn'] === 'createProductRecord' && func_and_params['params'][4]==='AB-') {
            ctx.stub.setEvent('product-type', JSON.stringify({'name': func_and_params.params[0]}))
            console.log('Chaincode event is being created!')
        }

    }
    /**
     * Create a product record
     * @param {Context} ctx the transaction context
     * @param {String} productId productID
     * @param {String} name name
     * @param {String} mfg_date date of manufacture
     * @param {String} productType product type
     */
    async createProductRecord(ctx,productId,name,mfg_date,productType){
        let precord = ProductRecord.createInstance(productId,name,mfg_date,productType);
        await ctx.productList.addPRecord(precord);
        return precord.toBuffer();
    }

    async getProductByKey(ctx, productId, name){
        //GRADED FUNCTION
        let precordKey = ProductRecord.makeKey([productId,name]);
        //TASK-1: Use a method from productRecord to read a record by key
        // get product record by calling the method of ProductList class
        return JSON.stringify(precord)
    }


    /**
     * Update  Quantity  of  an existing record
     * @param {Context} ctx the transaction context
     * @param {String} username username
     * @param {String} name name
     * @param {String} quantity string
     */
    async updateQuantity(ctx,productId,name,mfg_date, quantity){
        //GRADED FUNCTION
        let precordKey = ProductRecord.makeKey([productId,name]);
        //TASK-3: Use a method from productList to read a record by key
        //Use set_quantity from ProductRecord to update the quantity field
        //Use updatePRecord from productList to update the record on the ledger
        return precord.toBuffer();
    }



    /**
     * Evaluate a queryString
     * This is the helper function for making queries using a query string
     *
     * @param {Context} ctx the transaction context
     * @param {String} queryString the query string to be evaluated
    */    
   async queryWithQueryString(ctx, queryString) {

    console.log("query String");
    console.log(JSON.stringify(queryString));

    let resultsIterator = await ctx.stub.getQueryResult(queryString);

    let allResults = [];

    while (true) {
        let res = await resultsIterator.next();

        if (res.value && res.value.value.toString()) {
            let jsonRes = {};

            console.log(res.value.value.toString('utf8'));

            jsonRes.Key = res.value.key;

            try {
                jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
            } catch (err) {
                console.log(err);
                jsonRes.Record = res.value.value.toString('utf8');
            }

            allResults.push(jsonRes);
        }
        if (res.done) {
            console.log('end of data');
            await resultsIterator.close();
            console.info(allResults);
            console.log(JSON.stringify(allResults));
            return JSON.stringify(allResults);
        }
    }

}

    /**
     * Query by Product Type
     *
     * @param {Context} ctx the transaction context
     * @param {String} product type to be queried
    */
   async queryByProductType(ctx, productType ) {
        //  GRADED FUNCTION
        //   TASK-4 Complete teh queryString JSON Object to query using the ProductType Index  defined .(META-INF folder)
        //   Construct the JSON Couch DB selectir queryString that uses ProductType Index
        //   Pass the query string built to queryWithueryString

    return queryResults;

}

    /**
     * Query by Mfg_date
     *
     * @param {Context} ctx the transaction context
     * @param {String} mfg_date to queried
    */
   async queryByMfgdate(ctx, mfg_date) {
         //   GRADED FUNCTION
         //   TASK-5: Write new index for MfgDate and write a CouchDB selector query that uses it to query by MfgDate
         //    Construct the JSON DB selector that uses MfgDateIndex
         //    Pass the query string built to the queryWithQueryString()

    return queryResults;

}

    /**
     * Query by Product_Type Dual Query
     *
     * @param {Context} ctx the transaction context
     * @param {String} productType productType to queried
    */
   async queryByProduct_Type_Dual(ctx, productType1, productType2) {
        //  GRADED FUCNTION
        //  TASK-6: Write a CouchDB selector query that queries using two product types
        //  and uses the index created for prodcutType
        //  Construct the JSON couch DB selector that uses two product types
        //  Pass the query string to queryWithQueryString
    return queryResults;

}

}


module.exports = Productcontract;
