## initEnv result ##

```
# ./initEnv.sh -X -f
Env dir: /home/user/docker/blockchain/universal-payment
NPM path = '/home/user/docker/blockchain/universal-payment'
Vendor path = '/home/user/docker/blockchain/universal-payment/chaincode/src/universal_payment/vendor/github.com/hyperledger'
Fabric path = '/home/user/docker/blockchain/universal-payment/chaincode/src/universal_payment/vendor/github.com/hyperledger/fabric'
GutHub Fabric URL = 'https://github.com/hyperledger/fabric.git'
GutHub Fabric Version = 'v0.6'
Force remove '/home/user/docker/blockchain/universal-payment/chaincode/src/universal_payment/vendor/github.com/hyperledger'
Actual dir: /home/user/docker/blockchain/universal-payment/chaincode/src/universal_payment/vendor/github.com/hyperledger
Clone from https://github.com/hyperledger/fabric.git to /home/user/docker/blockchain/universal-payment/chaincode/src/universal_payment/vendor/github.com/hyperledger/fabric
Cloning into '/home/user/docker/blockchain/universal-payment/chaincode/src/universal_payment/vendor/github.com/hyperledger/fabric'...
remote: Counting objects: 27975, done.
remote: Compressing objects: 100% (150/150), done.
remote: Total 27975 (delta 57), reused 0 (delta 0), pack-reused 27823
Receiving objects: 100% (27975/27975), 44.52 MiB | 838.00 KiB/s, done.
Resolving deltas: 100% (15764/15764), done.
Checking connectivity... done.
Actual dir: /home/user/docker/blockchain/universal-payment/chaincode/src/universal_payment/vendor/github.com/hyperledger/fabric
Fetching origin
Move to branch v0.6
Branch v0.6 set up to track remote branch v0.6 from origin.
Switched to a new branch 'v0.6'
From https://github.com/hyperledger/fabric
 * branch            v0.6       -> FETCH_HEAD
Already up-to-date.
Remove git folder '/home/user/docker/blockchain/universal-payment/chaincode/src/universal_payment/vendor/github.com/hyperledger/fabric/.git*'
Actual dir: /home/user/docker/blockchain/universal-payment
Force remove '/home/user/docker/blockchain/universal-payment/node_modules'
Install NPM packages...
npm WARN deprecated node-uuid@1.4.7: use uuid module instead
npm WARN prefer global marked@0.3.6 should be installed with -g

> hashtable@2.0.2 install /home/user/docker/blockchain/universal-payment/node_modules/hashtable
> node-gyp configure build

gyp WARN download NVM_NODEJS_ORG_MIRROR is deprecated and will be removed in node-gyp v4, please use NODEJS_ORG_MIRROR
gyp WARN download NVM_NODEJS_ORG_MIRROR is deprecated and will be removed in node-gyp v4, please use NODEJS_ORG_MIRROR
gyp WARN download NVM_NODEJS_ORG_MIRROR is deprecated and will be removed in node-gyp v4, please use NODEJS_ORG_MIRROR
make: Entering directory '/home/user/docker/blockchain/universal-payment/node_modules/hashtable/build'
  CXX(target) Release/obj.target/native/src/hashtable.o
  SOLINK_MODULE(target) Release/obj.target/native.node
  COPY Release/native.node
make: Leaving directory '/home/user/docker/blockchain/universal-payment/node_modules/hashtable/build'

> sleep@3.0.1 install /home/user/docker/blockchain/universal-payment/node_modules/sleep
> node-gyp rebuild

gyp WARN download NVM_NODEJS_ORG_MIRROR is deprecated and will be removed in node-gyp v4, please use NODEJS_ORG_MIRROR
gyp WARN download NVM_NODEJS_ORG_MIRROR is deprecated and will be removed in node-gyp v4, please use NODEJS_ORG_MIRROR
gyp WARN download NVM_NODEJS_ORG_MIRROR is deprecated and will be removed in node-gyp v4, please use NODEJS_ORG_MIRROR
make: Entering directory '/home/user/docker/blockchain/universal-payment/node_modules/sleep/build'
  CXX(target) Release/obj.target/node_sleep/sleep.o
  SOLINK_MODULE(target) Release/obj.target/node_sleep.node
  COPY Release/node_sleep.node
make: Leaving directory '/home/user/docker/blockchain/universal-payment/node_modules/sleep/build'

> grpc@1.0.0 install /home/user/docker/blockchain/universal-payment/node_modules/grpc
> node-pre-gyp install --fallback-to-build

[grpc] Success: "/home/user/docker/blockchain/universal-payment/node_modules/grpc/src/node/extension_binary/grpc_node.node" is installed via remote
universal-payment@0.0.0 /home/user/docker/blockchain/universal-payment
├─┬ body-parser@1.16.1
│ ├── bytes@2.4.0
│ ├── content-type@1.0.2
│ ├── debug@2.6.1
│ ├── depd@1.1.0
│ ├─┬ http-errors@1.5.1
│ │ ├── inherits@2.0.3
│ │ ├── setprototypeof@1.0.2
│ │ └── statuses@1.3.1
│ ├── iconv-lite@0.4.15
│ ├─┬ on-finished@2.3.0
│ │ └── ee-first@1.1.1
│ ├── qs@6.2.1
│ ├─┬ raw-body@2.2.0
│ │ └── unpipe@1.0.0
│ └─┬ type-is@1.6.14
│   └── media-typer@0.3.0
├─┬ config@1.25.1
│ └── json5@0.4.0
├─┬ cookie-parser@1.4.3
│ ├── cookie@0.3.1
│ └── cookie-signature@1.0.6
├── dateformat@2.0.0
├─┬ express@4.14.1
│ ├─┬ accepts@1.3.3
│ │ └── negotiator@0.6.1
│ ├── array-flatten@1.1.1
│ ├── content-disposition@0.5.2
│ ├─┬ debug@2.2.0
│ │ └── ms@0.7.1
│ ├── encodeurl@1.0.1
│ ├── escape-html@1.0.3
│ ├── etag@1.7.0
│ ├─┬ finalhandler@0.5.1
│ │ └─┬ debug@2.2.0
│ │   └── ms@0.7.1
│ ├── fresh@0.3.0
│ ├── merge-descriptors@1.0.1
│ ├── methods@1.1.2
│ ├── parseurl@1.3.1
│ ├── path-to-regexp@0.1.7
│ ├─┬ proxy-addr@1.1.3
│ │ ├── forwarded@0.1.0
│ │ └── ipaddr.js@1.2.0
│ ├── qs@6.2.0
│ ├── range-parser@1.2.0
│ ├─┬ send@0.14.2
│ │ ├─┬ debug@2.2.0
│ │ │ └── ms@0.7.1
│ │ ├── destroy@1.0.4
│ │ └── mime@1.3.4
│ ├── serve-static@1.11.2
│ ├── utils-merge@1.0.0
│ └── vary@1.1.0
├── fs@0.0.1-security
├─┬ hfc@0.6.5
│ ├── aes-js@1.0.0
│ ├── asn1@0.2.3  (git+https://github.com/mcavage/node-asn1.git#2c2a19e285a609adfca36a0114bb5b86cf4ac61b)
│ ├── asn1js@1.2.12
│ ├── bn.js@4.11.6
│ ├── crypto@0.0.3
│ ├─┬ elliptic@6.4.0
│ │ ├── brorand@1.1.0
│ │ ├── hash.js@1.0.3
│ │ ├── hmac-drbg@1.0.0
│ │ ├── minimalistic-assert@1.0.0
│ │ └── minimalistic-crypto-utils@1.0.1
│ ├─┬ es6-set@0.1.4
│ │ ├── d@0.1.1
│ │ ├── es5-ext@0.10.12
│ │ ├── es6-iterator@2.0.0
│ │ ├── es6-symbol@3.1.0
│ │ └── event-emitter@0.3.4
│ ├── events@1.1.1
│ ├── fs@0.0.2
│ ├─┬ grpc@1.0.0
│ │ ├── arguejs@0.2.3
│ │ ├── lodash@3.10.1
│ │ ├── nan@2.5.1
│ │ ├─┬ node-pre-gyp@0.6.29
│ │ │ ├─┬ mkdirp@0.5.1
│ │ │ │ └── minimist@0.0.8
│ │ │ ├─┬ nopt@3.0.6
│ │ │ │ └── abbrev@1.0.9
│ │ │ ├─┬ npmlog@3.1.2
│ │ │ │ ├─┬ are-we-there-yet@1.1.2
│ │ │ │ │ ├── delegates@1.0.0
│ │ │ │ │ └─┬ readable-stream@2.1.5
│ │ │ │ │   ├── buffer-shims@1.0.0
│ │ │ │ │   ├── core-util-is@1.0.2
│ │ │ │ │   ├── inherits@2.0.1
│ │ │ │ │   ├── isarray@1.0.0
│ │ │ │ │   ├── process-nextick-args@1.0.7
│ │ │ │ │   ├── string_decoder@0.10.31
│ │ │ │ │   └── util-deprecate@1.0.2
│ │ │ │ ├── console-control-strings@1.1.0
│ │ │ │ ├─┬ gauge@2.6.0
│ │ │ │ │ ├── aproba@1.0.4
│ │ │ │ │ ├── has-color@0.1.7
│ │ │ │ │ ├── has-unicode@2.0.1
│ │ │ │ │ ├── object-assign@4.1.0
│ │ │ │ │ ├── signal-exit@3.0.0
│ │ │ │ │ ├─┬ string-width@1.0.2
│ │ │ │ │ │ ├─┬ code-point-at@1.0.0
│ │ │ │ │ │ │ └── number-is-nan@1.0.0
│ │ │ │ │ │ └─┬ is-fullwidth-code-point@1.0.0
│ │ │ │ │ │   └── number-is-nan@1.0.0
│ │ │ │ │ ├─┬ strip-ansi@3.0.1
│ │ │ │ │ │ └── ansi-regex@2.0.0
│ │ │ │ │ └── wide-align@1.1.0
│ │ │ │ └── set-blocking@2.0.0
│ │ │ ├─┬ rc@1.1.6
│ │ │ │ ├── deep-extend@0.4.1
│ │ │ │ ├── ini@1.3.4
│ │ │ │ ├── minimist@1.2.0
│ │ │ │ └── strip-json-comments@1.0.4
│ │ │ ├─┬ request@2.74.0
│ │ │ │ ├── aws-sign2@0.6.0
│ │ │ │ ├── aws4@1.4.1
│ │ │ │ ├─┬ bl@1.1.2
│ │ │ │ │ └─┬ readable-stream@2.0.6
│ │ │ │ │   ├── core-util-is@1.0.2
│ │ │ │ │   ├── inherits@2.0.1
│ │ │ │ │   ├── isarray@1.0.0
│ │ │ │ │   ├── process-nextick-args@1.0.7
│ │ │ │ │   ├── string_decoder@0.10.31
│ │ │ │ │   └── util-deprecate@1.0.2
│ │ │ │ ├── caseless@0.11.0
│ │ │ │ ├─┬ combined-stream@1.0.5
│ │ │ │ │ └── delayed-stream@1.0.0
│ │ │ │ ├── extend@3.0.0
│ │ │ │ ├── forever-agent@0.6.1
│ │ │ │ ├─┬ form-data@1.0.0-rc4
│ │ │ │ │ └── async@1.5.2
│ │ │ │ ├─┬ har-validator@2.0.6
│ │ │ │ │ ├─┬ chalk@1.1.3
│ │ │ │ │ │ ├── ansi-styles@2.2.1
│ │ │ │ │ │ ├── escape-string-regexp@1.0.5
│ │ │ │ │ │ ├─┬ has-ansi@2.0.0
│ │ │ │ │ │ │ └── ansi-regex@2.0.0
│ │ │ │ │ │ ├─┬ strip-ansi@3.0.1
│ │ │ │ │ │ │ └── ansi-regex@2.0.0
│ │ │ │ │ │ └── supports-color@2.0.0
│ │ │ │ │ ├─┬ commander@2.9.0
│ │ │ │ │ │ └── graceful-readlink@1.0.1
│ │ │ │ │ ├─┬ is-my-json-valid@2.13.1
│ │ │ │ │ │ ├── generate-function@2.0.0
│ │ │ │ │ │ ├─┬ generate-object-property@1.2.0
│ │ │ │ │ │ │ └── is-property@1.0.2
│ │ │ │ │ │ ├── jsonpointer@2.0.0
│ │ │ │ │ │ └── xtend@4.0.1
│ │ │ │ │ └─┬ pinkie-promise@2.0.1
│ │ │ │ │   └── pinkie@2.0.4
│ │ │ │ ├─┬ hawk@3.1.3
│ │ │ │ │ ├── boom@2.10.1
│ │ │ │ │ ├── cryptiles@2.0.5
│ │ │ │ │ ├── hoek@2.16.3
│ │ │ │ │ └── sntp@1.0.9
│ │ │ │ ├─┬ http-signature@1.1.1
│ │ │ │ │ ├── assert-plus@0.2.0
│ │ │ │ │ ├─┬ jsprim@1.3.0
│ │ │ │ │ │ ├── extsprintf@1.0.2
│ │ │ │ │ │ ├── json-schema@0.2.2
│ │ │ │ │ │ └── verror@1.3.6
│ │ │ │ │ └─┬ sshpk@1.9.2
│ │ │ │ │   ├── asn1@0.2.3
│ │ │ │ │   ├── assert-plus@1.0.0
│ │ │ │ │   ├── dashdash@1.14.0
│ │ │ │ │   ├── ecc-jsbn@0.1.1
│ │ │ │ │   ├── getpass@0.1.6
│ │ │ │ │   ├── jodid25519@1.0.2
│ │ │ │ │   ├── jsbn@0.1.0
│ │ │ │ │   └── tweetnacl@0.13.3
│ │ │ │ ├── is-typedarray@1.0.0
│ │ │ │ ├── isstream@0.1.2
│ │ │ │ ├── json-stringify-safe@5.0.1
│ │ │ │ ├─┬ mime-types@2.1.11
│ │ │ │ │ └── mime-db@1.23.0
│ │ │ │ ├── node-uuid@1.4.7
│ │ │ │ ├── oauth-sign@0.8.2
│ │ │ │ ├── qs@6.2.1
│ │ │ │ ├── stringstream@0.0.5
│ │ │ │ ├── tough-cookie@2.3.1
│ │ │ │ └── tunnel-agent@0.4.3
│ │ │ ├─┬ rimraf@2.5.4
│ │ │ │ └─┬ glob@7.0.5
│ │ │ │   ├── fs.realpath@1.0.0
│ │ │ │   ├─┬ inflight@1.0.5
│ │ │ │   │ └── wrappy@1.0.2
│ │ │ │   ├── inherits@2.0.1
│ │ │ │   ├─┬ minimatch@3.0.3
│ │ │ │   │ └─┬ brace-expansion@1.1.6
│ │ │ │   │   ├── balanced-match@0.4.2
│ │ │ │   │   └── concat-map@0.0.1
│ │ │ │   ├─┬ once@1.3.3
│ │ │ │   │ └── wrappy@1.0.2
│ │ │ │   └── path-is-absolute@1.0.0
│ │ │ ├── semver@5.2.0
│ │ │ ├─┬ tar@2.2.1
│ │ │ │ ├── block-stream@0.0.9
│ │ │ │ ├─┬ fstream@1.0.10
│ │ │ │ │ └── graceful-fs@4.1.5
│ │ │ │ └── inherits@2.0.1
│ │ │ └─┬ tar-pack@3.1.4
│ │ │   ├─┬ debug@2.2.0
│ │ │   │ └── ms@0.7.1
│ │ │   ├─┬ fstream@1.0.10
│ │ │   │ ├── graceful-fs@4.1.5
│ │ │   │ └── inherits@2.0.1
│ │ │   ├─┬ fstream-ignore@1.0.5
│ │ │   │ ├── inherits@2.0.1
│ │ │   │ └─┬ minimatch@3.0.3
│ │ │   │   └─┬ brace-expansion@1.1.6
│ │ │   │     ├── balanced-match@0.4.2
│ │ │   │     └── concat-map@0.0.1
│ │ │   ├─┬ once@1.3.3
│ │ │   │ └── wrappy@1.0.2
│ │ │   ├─┬ readable-stream@2.1.5
│ │ │   │ ├── buffer-shims@1.0.0
│ │ │   │ ├── core-util-is@1.0.2
│ │ │   │ ├── inherits@2.0.1
│ │ │   │ ├── isarray@1.0.0
│ │ │   │ ├── process-nextick-args@1.0.7
│ │ │   │ ├── string_decoder@0.10.31
│ │ │   │ └── util-deprecate@1.0.2
│ │ │   └── uid-number@0.0.6
│ │ └─┬ protobufjs@4.1.3
│ │   ├─┬ ascli@1.0.1
│ │   │ ├── colour@0.7.1
│ │   │ └── optjs@3.2.2
│ │   ├─┬ bytebuffer@4.1.0
│ │   │ ├── bufferview@1.0.1
│ │   │ └── long@2.4.0
│ │   ├─┬ glob@5.0.15
│ │   │ └── inflight@1.0.6
│ │   └─┬ yargs@3.32.0
│ │     ├── camelcase@2.1.1
│ │     ├─┬ cliui@3.2.0
│ │     │ ├─┬ strip-ansi@3.0.1
│ │     │ │ └── ansi-regex@2.1.1
│ │     │ └── wrap-ansi@2.1.0
│ │     ├── decamelize@1.2.0
│ │     ├─┬ os-locale@1.4.0
│ │     │ └─┬ lcid@1.0.0
│ │     │   └── invert-kv@1.0.0
│ │     ├─┬ string-width@1.0.2
│ │     │ ├── code-point-at@1.1.0
│ │     │ └─┬ is-fullwidth-code-point@1.0.0
│ │     │   └── number-is-nan@1.0.1
│ │     ├── window-size@0.1.4
│ │     └── y18n@3.2.1
│ ├─┬ hashtable@2.0.2
│ │ └── nan@2.5.1
│ ├── js-sha3@0.5.7
│ ├── json-stringify-safe@5.0.1
│ ├── jsrsasign@5.1.0
│ ├── jssha@2.2.0
│ ├── node-uuid@1.4.7
│ ├─┬ node.extend@1.1.6
│ │ └── is@3.2.1
│ ├── pkijs@1.3.33
│ ├── sjcl@1.0.3
│ ├── sjcl-codec@0.1.1
│ ├── sleep@3.0.1
│ ├─┬ tar-fs@1.15.1
│ │ ├── chownr@1.0.1
│ │ ├─┬ pump@1.0.2
│ │ │ ├─┬ end-of-stream@1.1.0
│ │ │ │ └── once@1.3.3
│ │ │ └─┬ once@1.4.0
│ │ │   └── wrappy@1.0.2
│ │ └─┬ tar-stream@1.5.2
│ │   └── bl@1.2.0
│ ├─┬ typedoc@0.4.5
│ │ ├─┬ fs-extra@0.30.0
│ │ │ ├── graceful-fs@4.1.11
│ │ │ ├── jsonfile@2.4.0
│ │ │ ├── klaw@1.3.1
│ │ │ ├── path-is-absolute@1.0.1
│ │ │ └─┬ rimraf@2.6.1
│ │ │   └── glob@7.1.1
│ │ ├─┬ handlebars@4.0.5
│ │ │ ├── async@1.5.2
│ │ │ ├─┬ optimist@0.6.1
│ │ │ │ └── wordwrap@0.0.3
│ │ │ ├─┬ source-map@0.4.4
│ │ │ │ └── amdefine@1.0.1
│ │ │ └─┬ uglify-js@2.8.8
│ │ │   ├── source-map@0.5.6
│ │ │   ├── uglify-to-browserify@1.0.2
│ │ │   └─┬ yargs@3.10.0
│ │ │     ├── camelcase@1.2.1
│ │ │     ├─┬ cliui@2.1.0
│ │ │     │ ├─┬ center-align@0.1.3
│ │ │     │ │ ├─┬ align-text@0.1.4
│ │ │     │ │ │ ├─┬ kind-of@3.1.0
│ │ │     │ │ │ │ └── is-buffer@1.1.4
│ │ │     │ │ │ ├── longest@1.0.1
│ │ │     │ │ │ └── repeat-string@1.6.1
│ │ │     │ │ └── lazy-cache@1.0.4
│ │ │     │ ├── right-align@0.1.3
│ │ │     │ └── wordwrap@0.0.2
│ │ │     └── window-size@0.1.0
│ │ ├── highlight.js@9.9.0
│ │ ├── lodash@4.17.4
│ │ ├── marked@0.3.6
│ │ ├─┬ minimatch@3.0.3
│ │ │ └─┬ brace-expansion@1.1.6
│ │ │   ├── balanced-match@0.4.2
│ │ │   └── concat-map@0.0.1
│ │ ├── progress@1.1.8
│ │ ├─┬ shelljs@0.7.6
│ │ │ ├─┬ glob@7.1.1
│ │ │ │ └── fs.realpath@1.0.0
│ │ │ ├── interpret@1.0.1
│ │ │ └─┬ rechoir@0.6.2
│ │ │   └─┬ resolve@1.3.2
│ │ │     └── path-parse@1.0.5
│ │ └── typedoc-default-themes@0.4.2
│ ├── typescript@1.8.10
│ ├─┬ url@0.11.0
│ │ ├── punycode@1.3.2
│ │ └── querystring@0.2.0
│ ├─┬ util@0.10.3
│ │ └── inherits@2.0.1
│ └── uuidv4@0.3.1
├─┬ morgan@1.7.0
│ ├── basic-auth@1.0.4
│ ├─┬ debug@2.2.0
│ │ └── ms@0.7.1
│ └── on-headers@1.0.1
├─┬ multer@1.3.0
│ ├── append-field@0.1.0
│ ├─┬ busboy@0.2.14
│ │ ├─┬ dicer@0.2.5
│ │ │ ├─┬ readable-stream@1.1.14
│ │ │ │ └── isarray@0.0.1
│ │ │ └── streamsearch@0.1.2
│ │ └─┬ readable-stream@1.1.14
│ │   ├── core-util-is@1.0.2
│ │   ├── isarray@0.0.1
│ │   └── string_decoder@0.10.31
│ ├─┬ concat-stream@1.6.0
│ │ ├─┬ readable-stream@2.2.3
│ │ │ ├── buffer-shims@1.0.0
│ │ │ ├── isarray@1.0.0
│ │ │ ├── process-nextick-args@1.0.7
│ │ │ └── util-deprecate@1.0.2
│ │ └── typedarray@0.0.6
│ ├─┬ mkdirp@0.5.1
│ │ └── minimist@0.0.8
│ ├── object-assign@3.0.0
│ └── xtend@4.0.1
├─┬ request@2.80.0
│ ├── aws-sign2@0.6.0
│ ├── aws4@1.6.0
│ ├── caseless@0.12.0
│ ├─┬ combined-stream@1.0.5
│ │ └── delayed-stream@1.0.0
│ ├── extend@3.0.0
│ ├── forever-agent@0.6.1
│ ├─┬ form-data@2.1.2
│ │ └── asynckit@0.4.0
│ ├─┬ har-validator@4.2.1
│ │ ├─┬ ajv@4.11.4
│ │ │ ├── co@4.6.0
│ │ │ └─┬ json-stable-stringify@1.0.1
│ │ │   └── jsonify@0.0.0
│ │ └── har-schema@1.0.5
│ ├─┬ hawk@3.1.3
│ │ ├── boom@2.10.1
│ │ ├── cryptiles@2.0.5
│ │ ├── hoek@2.16.3
│ │ └── sntp@1.0.9
│ ├─┬ http-signature@1.1.1
│ │ ├── assert-plus@0.2.0
│ │ ├─┬ jsprim@1.3.1
│ │ │ ├── extsprintf@1.0.2
│ │ │ ├── json-schema@0.2.3
│ │ │ └── verror@1.3.6
│ │ └─┬ sshpk@1.11.0
│ │   ├── assert-plus@1.0.0
│ │   ├── bcrypt-pbkdf@1.0.1
│ │   ├─┬ dashdash@1.14.1
│ │   │ └── assert-plus@1.0.0
│ │   ├── ecc-jsbn@0.1.1
│ │   ├─┬ getpass@0.1.6
│ │   │ └── assert-plus@1.0.0
│ │   ├── jodid25519@1.0.2
│ │   ├── jsbn@0.1.1
│ │   └── tweetnacl@0.14.5
│ ├── is-typedarray@1.0.0
│ ├── isstream@0.1.2
│ ├─┬ mime-types@2.1.14
│ │ └── mime-db@1.26.0
│ ├── oauth-sign@0.8.2
│ ├── performance-now@0.2.0
│ ├── qs@6.3.2
│ ├── stringstream@0.0.5
│ ├─┬ tough-cookie@2.3.2
│ │ └── punycode@1.4.1
│ ├── tunnel-agent@0.4.3
│ └── uuid@3.0.1
└─┬ serve-favicon@2.4.1
  ├── etag@1.8.0
  ├── fresh@0.5.0
  └── ms@0.7.2


NPM packages Installed
```