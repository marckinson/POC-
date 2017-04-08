'use strict';


const Util = require('./chaincode-util.js');
const nodeUtil = require('util');
//const hfc = require('hfc');

//let config = require(config)

class Payment {

    constructor(usersToSecurityContext) {
        console.log('INFO: Payment -> usersToSecurityContext: ' + nodeUtil.inspect(usersToSecurityContext)); 
        this.usersToSecurityContext = usersToSecurityContext;
    }

    queryHash(userId, fileInBase64, hashType) {
        let securityContext = this.usersToSecurityContext[userId];
        return Util.queryChaincode(securityContext, 'hash', [ fileInBase64, hashType ]);
    }

    invokePaymentInstruction(userId, date, checksum, hashFunction, network, handler) {
        let securityContext = this.usersToSecurityContext[userId];
        return Util.invokeChaincode(securityContext, 'create_payment_instruction', [ date, checksum, hashFunction, network, handler ]);
    }

    handlePayment(userId, checksum, status, date) {
        let securityContext = this.usersToSecurityContext[userId];
        return Util.invokeChaincode(securityContext, 'handle_payment_instruction', [checksum, status, date]);
    }

    queryPayment(userId, checksum) {
        let securityContext = this.usersToSecurityContext[userId];
        return Util.queryChaincode(securityContext, 'get_payment_instruction', [ checksum ]);
    }

    listPayments(userId, emitter, handler, status) {
        let securityContext = this.usersToSecurityContext[userId];
        return Util.queryChaincode(securityContext, 'list_payment_instructions', [ emitter, handler, status ]);
    }
}

module.exports = Payment;
