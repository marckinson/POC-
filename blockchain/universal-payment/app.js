'use strict';
let express = require('express');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let path = require('path');
let url = require('url');
let fs = require('fs');
let dateFormat = require('dateformat');
const u = require('util');

const dirLogs=path.join(__dirname,'logs')

if (!fs.existsSync(dirLogs)){
    fs.mkdirSync(dirLogs);
}

var LOG_ERASE_MODE = 'w';
var LOG_APPEND_MODE = 'a';
var LOG_MODE = LOG_APPEND_MODE;

var log_file = fs.createWriteStream(path.join(dirLogs,'/app.log'), {flags : LOG_MODE});
let log_stdout = process.stdout;
let log_stderr = process.stderr;

let dFormat = dateFormat(new Date(), "yyyy/mm/dd HH:MM:ss");
log_file.write('============================================\n');
log_file.write('Start App.js at ' + dFormat + '\n');
log_file.write('============================================\n');

console.log = function(d) {
  log_file.write(u.format(d) + '\n');
  log_stdout.write(u.format(d) + '\n');
};
console.warn = function(d) {
  log_file.write(u.format(d) + '\n');
  log_stderr.write(u.format(d) + '\n');
};
console.error = function(d) {
  log_file.write(u.format(d) + '\n');
  log_stderr.write(u.format(d) + '\n');
};

//configuration file 
// use "export NODE_ENV=production" or "set NODE_ENV=production" (on Windows) to switch conf file
let config = require('config');
let favicon = require('serve-favicon');
//LOGGING HTTP REQUEST
let logger = require('morgan');

//Global variable
let gVar = require(path.join(__dirname,'utils/global-variables'));

//HFC
let hfc=require('hfc');
// OUR OWN MODULES
let startup = require(path.join(__dirname,'config/startup/startup.js'));
let Util = require(path.join(__dirname,'utils/chaincode-util.js'));
// Security context to keep users security information
const SecurityContext = require(path.join(__dirname,'security/securitycontext'));
// Object of users' names linked to their security context
// in gVar now !!
//let securityContextUsers = {};

//ROUTE 
let upload = require('./routes/upload'); 
let download = require('./routes/download'); 
let payment = require('./routes/payment'); 
let blockchain = require('./routes/blockchain'); 

//APPLICATION
let app = express();
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// APP USE  
app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/info', blockchain); 
app.use('/api', upload); 
app.use('/api', download); 
app.use('/api', payment);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.log('INFO: App -> Error Handler -', req.url, err);
  // set locals, only providing error in development
  //res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.send({'message':err});
});

let deployPath = 'chaincode';

process.env.GOPATH = path.resolve(path.join(__dirname, deployPath));
console.log('INFO: App -> Deploy path: ', path.resolve(path.join(__dirname, deployPath)));

// HFC
// Setup HFC
let chain = hfc.newChain(config.get('chainCodeName'));
//This is the location of the key store HFC will use. If running locally, this directory must exist on your machine
chain.setKeyValStore(hfc.newFileKeyValStore(path.join(__dirname,config.get('key_store_location'))));


//Probably make difference if ssl Enabled
let hfcProtocol = config.get('hfcProtocol');

console.log("INFO: App -> Add Peers and CA");
let ca = config.get('ca');
let peers = config.get('peers');

startup.connectToPeers(chain, hfcProtocol, peers);
startup.connectToCA(chain, hfcProtocol, ca);

// https://github.com/IBM-Blockchain/car-lease-demo/issues/93
// https://github.com/IBM-Blockchain/ibm-blockchain-issues/issues/84
// EventHub still not working on 01/03/2017
//startup.connectToEventHub(chain, hfcProtocol, peers);


// Setup HFC EventHub callbacks
var eh = chain.getEventHub();
var regChainBlockEvent = eh.registerBlockEvent(function(event) {
    //console.log(util.format("Block event: %j\n", event.payload.toString()));
    console.log("INFO: App -> Block event[",JSON.stringify(event),']');
});


console.log("INFO: App -> Add Registrar and Users with ChainCode");
let registrar = config.get('registrar');
let users = config.get('users');
let chaincodeID;
//SEQUENCE OF AUTHENTICATION AND DEPLOYING CHAINCODE
startup.enrollRegistrar(chain, registrar.username, registrar.password)
.then(function(r) {
    registrar = r;
    chain.setRegistrar(registrar);
    // We keep good object/answer of registrar in gVar.securityContextUsers
    gVar.securityContextUsers.registrar=new SecurityContext(registrar);
    console.log('INFO: App -> Set registrar');
    return startup.enrollUsers(chain, users, registrar);
})
.then(function(users) {
    console.log('INFO: App -> All users registered');
    users.forEach(function(user) {
        // We keep all object/answer of user in gVar.securityContextUsers
        gVar.securityContextUsers[user.getName()]=new SecurityContext(user);
        //console.log(user);
    });
})
.then(function(){
   console.log('INFO: App -> Checking if chaincode is deployed');
    return new Promise(function(resolve, reject) {
        fs.readFile('chaincodeID.txt', 'utf8', function(err, contents) {
            if (err) {
                resolve(false);
            } else {
                resolve(contents);
            }
        });
    });
})
.then(function(ccID) { //ChaincodeID exists or doesnt
    if (ccID) {
       chaincodeID=ccID;
       console.log('INFO: App -> Chaincode id['+chaincodeID+'] error may appear here - Ignore, chaincode has been pinged');
       
       // Setup chaincode Event listener
       var regChainCodeEvent = eh.registerChaincodeEvent(chaincodeID, "evtsender", function(event) {
        	//console.log(util.format("Custom event received, payload: %j\n", event.payload.toString()));
        	console.log("INFO: App -> Custom event received [",event,']');
		    });
       
        try {
            //set chaincodeId to registrar
            let sc = new SecurityContext(gVar.securityContextUsers['registrar'].getEnrolledMember());
            sc.setChaincodeID(chaincodeID);
			// process.exit();
            return startup.pingChaincode(chain, sc);
        } catch(e) {
            //ping didnt work
            console.error('ERROR: App -> Catch on ping test Error[',e,']');
            return false;
        }
    } else {
        return false;
    }
}).then(function(exists) {
    if (!exists) {
        console.log('INFO: App -> We have to deploy ChainCode');
        //disconnect before deploying because npm crash or timeout error from hyperledger
        //chain.getEventHub().disconnect();
        //We obtain certificate or not ??
        let certPath = 'certificate.pem';
        return startup.deployChaincode(gVar.securityContextUsers.registrar, 'universal_payment', 'Init', [], certPath);
		//return startup.deployChaincode(gVar.securityContextUsers.registrar, 'universal_payment', 'Init', [], certPath);
    } else {
        console.log('INFO: App -> Chaincode already deployed');
        return {'chaincodeID': chaincodeID};
    }
}).then(function(deploy) {
    fs.writeFileSync('chaincodeID.txt', deploy.chaincodeID, 'utf8');
    for (let user in gVar.securityContextUsers) {
        gVar.securityContextUsers[user].setChaincodeID(deploy.chaincodeID);
    }
    //reconnect after deploying 
    //chain.getEventHub().connect();
    console.log('INFO: App -> Chaincode successfully deployed');
}).then(function(){
  console.log('INFO: App -> End of Execution @TODO Add Verify Function HERE');
}).catch(function(err) {
    console.error('ERROR: App -> CATCH ERROR during starting phase',err);
});
// ----- END OF HFC -------


module.exports = app;
