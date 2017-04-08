'use strict';

const ATTRS = ['username', 'role'];
const hfc = require('hfc');
const StringDecoder = require('string_decoder').StringDecoder;

class Util {
    static queryChaincode(securityContext, functionName, args) {
        try {
            if (!securityContext) {
                throw new Error('securityContext not provided');
            }  else if (!functionName) {
                throw new Error('functionName not provided');
            } else if (!args) {
                throw new Error('args not provided');
            }

            return new Promise(function(resolve, reject) {
                args.forEach(function(arg) {
                    if (typeof arg !== 'string') {
                        throw new Error('Invalid arg specified ' + arg + ' in ', JSON.stringify(args));
                    }
                });

                let user = securityContext.getEnrolledMember();

                let query = {
                    chaincodeID: securityContext.getChaincodeID(),
                    fcn: functionName,
                    args: args,
                    attrs: ATTRS
                };
                console.log('INFO: Util -> [#] Query: ', JSON.stringify(query));

                let tx = user.query(query);

                tx.on('submitted', function() {
                    console.log('INFO: Util -> QUERY -> SUBMITTED');
                });

                tx.on('complete', function(data) {
                    let decoder = new StringDecoder('utf8');
                    console.log('INFO: Util -> QUERY -> COMPLETE full data:');
                    console.log(data);
                    console.log('INFO: Util -> QUERY -> decode data:');
                    console.log(decoder.write(data.result));
                    console.log('INFO: Util -> QUERY -> Unit8Array data:');
                    console.log('[' + new Uint8Array(data.result) + ']');
                    resolve(data.result);
                });

                tx.on('error', function (err) {
                    console.warn('ERROR: Util -> QUERY -> Attempted to query chaincode with error: ['+JSON.stringify(err)+']');
                    if (err instanceof hfc.EventTransactionError) {
                        reject(new Error(err.msg));
                    } else {
                        reject(err);
                    }
                });
            });

        } catch(e) {
            console.error('ERROR: Util ->  QUERY -> CATCH', e);
        }
    }

    static invokeChaincode(securityContext, functionName, args) {
        try {
            if (!securityContext) {
                throw new Error('securityContext not provided');
            } else if (!functionName) {
                throw new Error('functionName not provided');
            } else if (!args) {
                throw new Error('args not provided');
            }

            return new Promise(function(resolve, reject) {
                args.forEach(function(arg) {
                    if (typeof arg !== 'string') {
                        throw new Error('Invalid arg specified ' + arg + ' in ', args);
                    }
                });

                let user = securityContext.getEnrolledMember();

                let invoke = {
                    chaincodeID: securityContext.getChaincodeID(),
                    fcn: functionName,
                    args: args,
                    attrs: ATTRS
                };

                console.log('INFO: Util -> [#] Invoke: ', JSON.stringify(invoke));

                let tx = user.invoke(invoke);

                tx.on('submitted', function(data) {
                    console.log('INFO: Util -> INVOKE -> SUBMITTED');
                });

                tx.on('complete', function(data) {
                    let decoder = new StringDecoder('utf8');
                    console.log('INFO: Util -> INVOKE -> COMPLETE full data:');
                    console.log(data);
                    console.log('INFO: Util -> INVOKE -> decode data:');
                    console.log(decoder.write(data.result));
                    console.log('INFO: Util -> INVOKE -> Unit8Array data:');
                    console.log('[' + new Uint8Array(data.result) + ']');
                    resolve(data.result);
                });

                tx.on('error', function (err) {
                    console.warn('ERROR: Util ->  INVOKE -> Attempted to invoke chaincode with error: ['+JSON.stringify(err)+']');
                    if (err instanceof hfc.EventTransactionError) {
                        reject(new Error(err.msg));
                    } else {
                        reject(err);
                    }
                });
            });
        } catch (e) {
            console.error('ERROR: Util ->  INVOKE -> CATCH', e);
        }
    }
}

module.exports = Util;
