'use strict';

let express = require('express');
let router = express.Router();
let path = require('path');

//Global variable
let gVar = require(path.join(__dirname,'../utils/global-variables'));

/* GET download a file, give his SHA512 and we will find your file */
router.get('/download', function(req, res, next) {
	//Get hash in uint8array from header
  let ui8 = req.query.ui8;
  //decode URI
  ui8 = decodeURIComponent(ui8);

  if(!ui8){
    console.error('ERROR: Download -> provide an "ui8" valid value in query (warning encodeURI) in order to recover a potential file');
    res.status(406).end('Please provide an "ui8" valid value in query (warning encodeURI) in order to recover a potential file');
    return null;
  }
	let ui8Array = Uint8Array.from(ui8.split(','));
	console.log('INFO: Download -> ui8Array :'+ui8Array);
  let bufRequest = Buffer.from(ui8Array);
  //filter give an array in theory
  let files = gVar.filesFromBanking.filter(function(element){
    let bufElement=Buffer.from(element.chainCodeHashUInt8Array);
    if(bufRequest.equals(bufElement)){
      return element;
    }
  });
  if(typeof files !== 'undefined' && files.length > 0){
    console.log('INFO: Download -> file recovered originalname:'+JSON.stringify(files[0].originalname, null, 2)+ ' local name in uploads folder filename :'+ JSON.stringify(files[0].filename, null, 2) );
    res.download(files[0].path, files[0].originalname);
  }else{
    console.error('ERROR: Download -> file not found with Uint8Array[',ui8,']');
    res.status(400).end('Download -> file not found');
  }

});


module.exports = router;
