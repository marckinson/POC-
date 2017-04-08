'use strict';

let express = require('express');
let router = express.Router();
let path = require('path');

let multer = require('multer');

let fs = require('fs');

let payment = require(path.join(__dirname,'../utils/chaincode-payment.js'));

let config = require('config');

//Global variable
let gVar = require(path.join(__dirname,'../utils/global-variables'));

let paymentManipulator = new payment(gVar.securityContextUsers);


//@TODO make a query to obtain the HASH_FUNCTION used by the blockchain
const HASH_FUNCTION = "sha512";

function paymentRequest(username, date, checksum, hashFunction, network, handler){
	return paymentManipulator.invokePaymentInstruction(username, date, checksum, hashFunction, network, handler)
}

exports.paymentRequest = paymentRequest;

function handlePayment(username, checksum, status, date) {
	return paymentManipulator.handlePayment(username, checksum, status, date)
}

exports.handlePayment = handlePayment;

function getPayment(username, checksum){
	return paymentManipulator.queryPayment(username, checksum)
}


exports.getPayment = getPayment;

function listPayments(username, emitter, handler, status) {
	return paymentManipulator.listPayments(username, emitter, handler, status)
}

exports.listPayments = listPayments;

var uploading = multer({
	dest: path.join(__dirname,'../uploads'),
	limits: {fileSize: 1000000, files:1},
})

router.post('/payment', uploading.single('bankingFile'), function(req, res, next) {
	let username = req.body.emitter;
	let date = Date.now().toString();
	let hashFunction = HASH_FUNCTION;
	let network = req.body.network;
	let handler = req.body.handler;
	let file = req.file;

	console.log('INFO: Payment -> username: ' + username);
	console.log('INFO: Payment -> date: ' + date);
	console.log('INFO: Payment -> hash_function: '+ hashFunction);
	console.log('INFO: Payment -> network: ' + network);
	console.log('INFO: Payment -> handler: ' + handler);

	paymentManipulator.queryHash(username, base64_encode(file.path),hashFunction).then(
	function(sha512) {
		console.log('INFO: Payment -> sha512 String of input file : ' + sha512);

		var ui8 = Uint8Array.from(sha512);
		file.chainCodeHashUInt8Array = ui8;
		gVar.filesFromBanking.push(file);
		console.log('INFO: Payment -> sha512 String to Uint8Array to avoid encoding problem');
		console.log('INFO: Payment -> checksum saved : ', file.chainCodeHashUInt8Array.toString());

		paymentRequest(username, date, ui8.toString(), hashFunction, network, handler).then(function(result) {
			console.log('INFO: Payment -> invokePaymentInstruction SUCCESS');
			console.log(result.toString());
			res.status(200).send(JSON.stringify({'message':'SUCCESS', 'ui8': ui8.toString(), 'result':result.toString()}));
		})
		.catch(function(err) {
			var strErr = err.toString();
			console.error('ERROR: Payment -> invokePaymentInstruction FAILED', strErr);
			res.status(500).send(JSON.stringify({'message': strErr}));
		});
	})
});

router.put('/payment', function(req, res, next) {
	let username = req.body.handler;
	let checksum = req.body.checksum;
	let status = req.body.status;
	let date = Date.now().toString();
	console.log('INFO: PUT Payment -> Don\'t forget sha512 String to Uint8Array to avoid encoding problem');

	console.log('INFO: PUT /payment -> username:' + username);
	console.log('INFO: PUT /payment -> checksum:' + checksum);
	console.log('INFO: PUT /payment -> status:' + status);
	console.log('INFO: PUT /payment -> date:' + date);
	if (!username || !checksum || !status) {
		res.status(500).send(JSON.stringify({'message': 'Required field username, checksum or status is empty'}));
	}
	
	handlePayment(username, checksum, status, date).then(function(result) {
		console.log('INFO: PUT /payment  -> SUCCESS');
		console.log(result.toString());
		res.status(200).send(JSON.stringify({'message':'SUCCESS', 'result':result.toString(), 'checksum':checksum, 'status':status}));
	})
	.catch(function(err) {
		var strErr = err.toString();
		console.error('ERROR: PUT /payment  -> ERROR', strErr);
		res.status(500).send(JSON.stringify({'message': strErr}));
	});
});

router.get('/payment', function(req, res, next) {
	//Get user from body to test
	let username = req.query.username;
	console.log('INFO: Payment -> username:' + username);

	//Get user from body to test
	let checksum = req.query.checksum;
	//@TODO decode URI
	console.log('INFO: Payment -> checksum:' + checksum);

	if(!checksum){
		//@TODO FROM DATE TO DATE
		// OR
		console.log('INFO: Payment -> @TODO Get All Payments from ' + username);
	}
  
	getPayment(username,checksum).then(function(result) {
		console.log('INFO: Payment -> queryPayments Success');
		console.log(result);
		res.status(204).end();
	})
	.catch(function(err) {
		var strErr = err.toString();
		console.error('ERROR: Payment -> Query to queryPayments FAILED', strErr);
		res.status(500).send(JSON.stringify({'message': strErr}, null, 2));
	});

});

router.get('/payments', function(req, res, next) {
	let username = req.query.username;
	let emitter = req.query.emitter;
	let handler = req.query.handler;
	let status = req.query.status;

	console.log('INFO: Payments -> username: ' + username);
	console.log('INFO: Payments -> emitter: ' + emitter);
	console.log('INFO: Payments -> handler: ' + handler);
	console.log('INFO: Payments -> status: ' + status);

	listPayments(username, emitter, handler, status).then(function(result) {
		console.log('INFO: Payments -> SUCCESS');
		var strResult = result.toString();
		console.log('INFO: Payments -> String data:');
		console.log(strResult);
		res.status(200).send(JSON.stringify(JSON.parse(strResult), null, 2));
	})
	.catch(function(err) {
		var strErr = err.toString();
		console.error('ERROR: Payments -> FAILURE', strErr);
		res.status(500).send(JSON.stringify({'message': strErr}, null, 2));
	});
  
});

function base64_encode(pathFile) {
	var binaryData = fs.readFileSync(pathFile);
	return new Buffer(binaryData).toString('base64');
}

module.exports = router;
