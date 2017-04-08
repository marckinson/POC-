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

var uploading = multer({
  dest: path.join(__dirname,'../uploads'),
  limits: {fileSize: 1000000, files:1},
})


/* POST  upload a file, his name needs to be bankingFile */
router.post('/upload', uploading.single('bankingFile'), function(req, res, next) {
	//Get user from header to test
	let username = req.body.username;
	console.log('INFO: Upload -> username:'+username);
	let f = req.file;//take care here it's file with multer and not files
	console.log('INFO: Upload -> file submit:\n'+JSON.stringify(f,null, 2)); 
  let hashType=req.body.hashType;
  if(!hashType){
    //default hash type if not hash provided in request
    hashType='sha512';
  }
  console.log('INFO: Upload -> hashType provided:\n'+hashType); 

  //Exit 406 if username or file is not provided
  if(!username || !f){
    console.error('ERROR: Upload -> Please provide a post "multipart/form-data" with "bankingFile", "username" and "hash" ("hash" is the type of hash to be used)\n "hash" can be optional, its default value is sha512');
    res.status(406).end('Please provide a post "multipart/form-data" with "bankingFile", "username" and "hash" ("hash" is the type of hash to be used)\n "hash" can be optional, its default value is sha512');
    return null;
  }
   
	let paymentManipulator = new payment(gVar.securityContextUsers);
  	
  return paymentManipulator.queryHash(username,base64_encode(f.path),hashType)
    .then(function(resultHash) {
        console.log('INFO: Upload -> Query to obtain Hash of file');
        var ui8 = Uint8Array.from(resultHash);
		console.log(ui8.toString());
        f.chainCodeHashUInt8Array=ui8;
        gVar.filesFromBanking.push(f);
        res.status(200).end(JSON.stringify({"message":"SUCCESS","file":f.originalname,"filename":f.filename, "sha512String":resultHash.toString('UTF-8'),"ui8":f.chainCodeHashUInt8Array.toString()}));
    })
    .catch(function(err) {
        console.error('ERROR: Upload -> Query to obtain hash of file FAILED', err.stack);
        res.status(500).send(JSON.stringify({'message':err.stack}));
    });
});


// function to encode file data to base64 encoded string
function base64_encode(pathFile) {
    // read binary data
    var binaryData = fs.readFileSync(pathFile);
    // convert binary data to base64 encoded string
    return new Buffer(binaryData).toString('base64');
}


module.exports = router;
