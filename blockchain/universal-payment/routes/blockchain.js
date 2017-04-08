'use strict';

let express = require('express');
let router = express.Router();
let path = require('path');
let config = require("config");
let http = require('http');
let request = require('request');



//Global variable
let gVar = require(path.join(__dirname,'../utils/global-variables'));

router.get('/members', function(req, res, next) {
	console.info('INFO : BockChain -> GET members list');
	var result = [];
	var member, m, em;
	for (var key in gVar.securityContextUsers) {
		member = {};
		m = gVar.securityContextUsers[key];
		em = m.getEnrolledMember();
		console.log(em.getName());
		// console.log(em.toString());
		member.name = em.getName();
		member.roles = em.getRoles() || [];
		member.affiliation = em.getAffiliation() || '';
		result.push(member);
	}
	res.status(200);
	res.send(JSON.stringify(result));
});

/* GET specific blockchain information */
router.get('/blocks/:blockNum(\\d+)', function(req, res, next) {

  console.log('INFO: BockChain -> GET ', req.params.blockNum, ' Information');
  let api = config.get('api');
  //Recreate URL to invoke our hyperledger peer in order to obtain informations
  let bUrl = config.get('networkProtocol') + '://' + api.ip + ':' + api.port_external + '/chain/blocks/'+req.params.blockNum;
  let options = {
      url: bUrl,
      method: 'GET'
  };
  request(options, function (error, response, body){
      if (!error && response.statusCode === 200) {
        let result = {};
        result.block = JSON.parse(body);
        console.log('INFO: BockChain -> GET ',req.params.blockNum, ' SUCCEED\n',result);
        res.send(JSON.stringify(result));
      }
      else
      {
        res.status(400);
        let err = {};
        err.message = 'Unable to get block';
        err.error = true;
        console.error('ERROR : BockChain -> GET ',req.params.blockNum, ' ERROR[',error,']');
        res.send(err);
      }
  });
});

/* GET blockchains information */
router.get('/blocks', function(req, res, next) {

  console.log('INFO: BockChain -> GET chain informations');
  let api = config.get('api');
  //Recreate URL to invoke our hyperledger peer in order to obtain informations
  let options = {
      url: config.get('networkProtocol') + '://' + api.ip+':'+api.port_external+'/chain',
      method: 'GET'
  };

  console.log(options);
  request(options, function (error, response, body){
        if (!error && response && response.statusCode === 200) {
            let result = {};
            result.height = JSON.parse(body).height;
            // If the dvla hasnt been given a chaincode ID yet, do not adjust the block height
            if (!gVar.securityContextUsers && !gVar.securityContextUsers.registrar) {
                result.height = 1;
            } else if (gVar.securityContextUsers && gVar.securityContextUsers.registrar && !gVar.securityContextUsers.registrar.getChaincodeID()) {
                result.height = 1;
            }
            result.currentBlockHash = JSON.parse(body).currentBlockHash;
            console.log('INFO: BockChain -> GET chain informations SUCCEED\n',result);
            res.send(result);
        }
        else
        {
            let err = {};
            err.message = 'Unable to get chain length';
            err.error = true;
            res.status(400);
            console.error('ERROR : BockChain -> GET chain information ERROR[',error,']');
            res.send(err);
        }
    });
});

// /* GET blockchains information */
router.get('/txs/:txId', function(req, res, next) {
	
	console.log('INFO: BockChain -> GET transaction informations');
	let api = config.get('api');
	// Recreate URL to invoke our hyperledger peer in order to obtain informations
	let options = {
		url: config.get('networkProtocol') + '://' + api.ip + ':' + api.port_external + '/transactions/' + req.params.txId,
		method: 'GET'
	};

	console.log(options);
	request(options, function (error, response, body) {
		let jsonObject = JSON.parse(body);
		if (!error && response && response.statusCode === 200) {
			let result = {};
			res.status(200).json(jsonObject);
		} else {
			let err = {};
			err.message = 'Unable to get transaction informations';
			err.error = true;
			res.status(404);
			console.error('ERROR : BockChain -> GET transaction informations ERROR[', error ,']');
			res.send(err);
		}
	});
});
module.exports = router;