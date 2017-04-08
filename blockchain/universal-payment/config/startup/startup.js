'use strict';

let path = require('path');
let Util = require(path.join(__dirname,'../../utils/chaincode-util.js'));
let hfc = require('hfc');


function connectToPeers(chain, hfcProtocol, peers, pem) {
    peers.forEach(function(peer, index) {
        chain.addPeer(hfcProtocol+'://'+peer.discovery_host+':'+peer.discovery_port, {pem:pem});
        console.log('INFO: Startup -> peer'+index+': '+hfcProtocol+'://'+peer.discovery_host+':'+peer.discovery_port);
    });
}

exports.connectToPeers = connectToPeers;

function connectToCA(chain, hfcProtocol, ca, pem) {
    chain.setMemberServicesUrl(hfcProtocol+'://'+ca.discovery_host+':'+ca.discovery_port, {pem:pem});
    console.log('INFO: Startup -> membersrvc: '+hfcProtocol+'://'+ca.discovery_host+':'+ca.discovery_port);
}

exports.connectToCA = connectToCA;

function connectToEventHub(chain, hfcProtocol, peers, pem) {
    peers.forEach(function(peer, index) {
        chain.eventHubConnect(hfcProtocol+'://'+peer.event_host + ':' + peer.event_port, {pem: pem});
        console.log('INFO: Startup -> eventHubConnect peer'+index+': ' + hfcProtocol+'://'+peer.event_host + ':' + peer.event_port);
    });
}

exports.connectToEventHub = connectToEventHub;

function enrollRegistrar(chain, username, secret) {
    return new Promise(function(resolve, reject) {
        chain.enroll(username, secret, function(err, registrar) {
            if (!err) {
                console.log('INFO: Startup -> Enrolled registrar');
                resolve(registrar);
            } else {
                console.error('ERROR: Startup -> Failed to enroll registrar with '+username + ' ' + secret);
                reject(err);
            }
        });
    });
}

exports.enrollRegistrar = enrollRegistrar;

function enrollUser(chain, user) {
    return new Promise(function(resolve, reject) {
        chain.registerAndEnroll(user, function(err, enrolledUser) {
            if (!err){
                // Successfully enrolled registrar and set this user as the chain's registrar which is authorized to register other users.
                console.log('INFO: Startup -> Registrar enroll worked with user '+user.enrollmentID);
                resolve(enrolledUser);
            }
            else{
                console.error('ERROR: Startup -> Failed to enroll '+user.enrollmentID+' using HFC. Error: '+JSON.stringify(err));
                reject(err);
            }
        });
    });
}

function enrollUsers(chain, users, registrar) {

    let promises = [];
    users.forEach(function (user) {
        user.registrar = registrar;
        promises.push(enrollUser(chain, user));
    });
    return Promise.all(promises);
}

exports.enrollUsers = enrollUsers;


function deployChaincode(memberFromSC, chaincodePath, functionName, args, certPath) {
    return new Promise(function(resolve, reject) {
        let enrolledUser = memberFromSC.getEnrolledMember();

        let deployRequest = {
            fcn: functionName,
            args: args,
            chaincodePath: chaincodePath
        };
        deployRequest.certificatePath = certPath;

        let transactionContext = enrolledUser.deploy(deployRequest);

        transactionContext.on('submitted', function(result) {
            console.log('INFO: Startup -> Attempted to deploy chaincode');
        });

        transactionContext.on('complete', function (result) {
            console.log('INFO: Startup -> Chaincode deployed with chaincodeID ' + result.chaincodeID);
            console.log('INFO: Startup -> result :');
            console.log(result);
            resolve(result);
        });

        transactionContext.on('error', function (error) {
            console.error('ERROR: Startup -> Attempted to deploy chaincode with error:['+JSON.stringify(error)+']');
            if (error instanceof hfc.EventTransactionError) {
                reject(new Error(error.msg));
            } else {
                reject(error);
            }
        });
    });
}

exports.deployChaincode = deployChaincode;

function pingChaincode(chain, securityContext) {
    return Util.queryChaincode(securityContext, 'ping', [])
    .then(function() {
        return true;
    })
    .catch(function(err) {
        console.error('ERROR: Startup -> ' + err);
        return false;
    });
}

exports.pingChaincode = pingChaincode;
