D:\development\Projects\Blockchain\universal-payment>npm install hfc@0.6.x
npm WARN deprecated node-uuid@1.4.7: use uuid module instead

> sleep@3.0.1 install D:\development\Projects\Blockchain\universal-payment\node_modules\hfc\node_modules\sleep
> node-gyp rebuild


D:\development\Projects\Blockchain\universal-payment\node_modules\hfc\node_modules\sleep>if not defined npm_config_node_gyp (node "D:\Progra
mmes\nodejs\node_modules\npm\bin\node-gyp-bin\\..\..\node_modules\node-gyp\bin\node-gyp.js" rebuild )  else (node "" rebuild )
Génération des projets individuellement dans cette solution. Pour activer la génération en parallèle, ajoutez le commutateur "/m".
MSBUILD : error MSB3428: Impossible de charger le composant Visual C++ "VCBuild.exe". Pour corriger le problème, vous devez 1) installer le
 Kit de développement .NET Framework 2.0 SDK, 2) installer Microsoft Visual Studio 2005 ou 3) ajouter l'emplacement du composant au chemin
d'accès système, s'il est installé ailleurs.  [D:\development\Projects\Blockchain\universal-payment\node_modules\hfc\node_modules\sleep\bui
ld\binding.sln]
gyp ERR! build error
gyp ERR! stack Error: `C:\Windows\Microsoft.NET\Framework\v4.0.30319\msbuild.exe` failed with exit code: 1
gyp ERR! stack     at ChildProcess.onExit (D:\Programmes\nodejs\node_modules\npm\node_modules\node-gyp\lib\build.js:276:23)
gyp ERR! stack     at emitTwo (events.js:87:13)
gyp ERR! stack     at ChildProcess.emit (events.js:172:7)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:200:12)
gyp ERR! System Windows_NT 6.1.7601
gyp ERR! command "D:\\Programmes\\nodejs\\node.exe" "D:\\Programmes\\nodejs\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js" "r
ebuild"
gyp ERR! cwd D:\development\Projects\Blockchain\universal-payment\node_modules\hfc\node_modules\sleep
gyp ERR! node -v v4.6.0
gyp ERR! node-gyp -v v3.4.0
gyp ERR! not ok

> hashtable@2.0.2 install D:\development\Projects\Blockchain\universal-payment\node_modules\hfc\node_modules\hashtable
> node-gyp configure build


D:\development\Projects\Blockchain\universal-payment\node_modules\hfc\node_modules\hashtable>if not defined npm_config_node_gyp (node "D:\Pr
ogrammes\nodejs\node_modules\npm\bin\node-gyp-bin\\..\..\node_modules\node-gyp\bin\node-gyp.js" configure build )  else (node "" configure b
uild )
Génération des projets individuellement dans cette solution. Pour activer la génération en parallèle, ajoutez le commutateur "/m".
MSBUILD : error MSB3428: Impossible de charger le composant Visual C++ "VCBuild.exe". Pour corriger le problème, vous devez 1) installer le
 Kit de développement .NET Framework 2.0 SDK, 2) installer Microsoft Visual Studio 2005 ou 3) ajouter l'emplacement du composant au chemin
d'accès système, s'il est installé ailleurs.  [D:\development\Projects\Blockchain\universal-payment\node_modules\hfc\node_modules\hashtable
\build\binding.sln]
gyp ERR! build error
gyp ERR! stack Error: `C:\Windows\Microsoft.NET\Framework\v4.0.30319\msbuild.exe` failed with exit code: 1
gyp ERR! stack     at ChildProcess.onExit (D:\Programmes\nodejs\node_modules\npm\node_modules\node-gyp\lib\build.js:276:23)
gyp ERR! stack     at emitTwo (events.js:87:13)
gyp ERR! stack     at ChildProcess.emit (events.js:172:7)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:200:12)
gyp ERR! System Windows_NT 6.1.7601
gyp ERR! command "D:\\Programmes\\nodejs\\node.exe" "D:\\Programmes\\nodejs\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js" "c
onfigure" "build"
gyp ERR! cwd D:\development\Projects\Blockchain\universal-payment\node_modules\hfc\node_modules\hashtable
gyp ERR! node -v v4.6.0
gyp ERR! node-gyp -v v3.4.0
gyp ERR! not ok

> grpc@1.0.0 install D:\development\Projects\Blockchain\universal-payment\node_modules\hfc\node_modules\grpc
> node-pre-gyp install --fallback-to-build

[grpc] Success: "D:\development\Projects\Blockchain\universal-payment\node_modules\hfc\node_modules\grpc\src\node\extension_binary\grpc_node
.node" is installed via remote
npm ERR! Windows_NT 6.1.7601
npm ERR! argv "D:\\Programmes\\nodejs\\node.exe" "D:\\Programmes\\nodejs\\node_modules\\npm\\bin\\npm-cli.js" "install" "hfc@0.6.x"
npm ERR! node v4.6.0
npm ERR! npm  v2.15.9
npm ERR! code ELIFECYCLE

npm ERR! sleep@3.0.1 install: `node-gyp rebuild`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the sleep@3.0.1 install script 'node-gyp rebuild'.
npm ERR! This is most likely a problem with the sleep package,
npm ERR! not with npm itself.
npm ERR! Tell the author that this fails on your system:
npm ERR!     node-gyp rebuild
npm ERR! You can get information on how to open an issue for this project with:
npm ERR!     npm bugs sleep
npm ERR! Or if that isn't available, you can get their info via:
npm ERR!
npm ERR!     npm owner ls sleep
npm ERR! There is likely additional logging output above.

npm ERR! Please include the following file with any support request:
npm ERR!     D:\development\Projects\Blockchain\universal-payment\npm-debug.log





https://github.com/nodejs/node-gyp/issues/802

I found this brilliant solution on GitHub:

Your OS MUST be Windows
Check that python is in your path by writting python --version in the console. If not then
Download python 2.7 (I recommend chocolatey (choco install python2 -y)) and add python.exe to your PATH variable.
Aren't you on Windows 7? Skip 5 and 6.
Check that you have .NET 4.5.1+ installed. If not then
Download and install .NET 4.5.1 (.NET 4.5.2 will also work just fine)
Download Microsoft Visual C++ Build Tools 2015 Technical Preview
Use custom install. Install the Windows 8.1 SDK if you haven't already. Apparently, it doesn't matter what OS you're on. You just need the Windows 8.1 SDK.
Set the npm config variable msvs_version to 2015: npm config -g set msvs_version 2015
Do npm i in what-ever project with node-gyp as a dependency without seeing weird error messages
My nightmares are gone!


---

## Couldn't get attribute 'role' #77

[Error: Error:Transaction or query returned with failure: QUERY: Error retrieving caller details: Couldn't get attribute 'role'. Error: Failed retrieving extension.]

https://github.com/IBM-Blockchain/ibm-blockchain-issues/issues/77

 # Enabling/disabling Attribute Certificate Authority, if ACA is enabled attributes will be added into the TCert.
 enabled: true

---

 EventDeployComplete {
  uuid: '8dcda3c3fb6c1072d69b01b757d2ac4f62a39c653bc0b0cd74fb62432f62bece',
  chaincodeID: '8dcda3c3fb6c1072d69b01b757d2ac4f62a39c653bc0b0cd74fb62432f62bece',
  result: undefined }

Result undefined ?

---

ERROR : Startup -> Attempted to deploy chaincode with error :[{"error":{"code":2,"metadata":{"_internal_repr":{}}},"msg":"Error: sql: no rows in result set"}]


Delete KeyValStore
Delete chaincodeID.txt

Reload all with ./start.bat


---

[Error: Error:Failed to launch chaincode spec(Could not get deployment transaction for 957dfb245e3c04ecff08344700623bdad77df2da06527d1a823fd
4255474e06d - LedgerError - ResourceNotFound: ledger: resource not found)]

$ docker ps -a
CONTAINER ID        IMAGE                                                                      COMMAND                  CREATED             STATUS                       PORTS               NAMES
a4de1ff5b073        dev-vp0-a87083f38064d7597e98031a56a1bc925e4e9e30406ea37c08ad2102c0bba752   "/opt/gopath/bin/a870"   5 minutes ago       Exited (2) 19 seconds ago                        dev-vp0-a87083f38064d7597e98031a56a1bc925e4e9e30406ea37c08ad2
102c0bba752
e09a9049018b        hyperledger/fabric-peer:latest                                             "sh -c 'while ! nc me"   5 minutes ago       Exited (137) 9 seconds ago                       docker_vp0
c10a338c91cb        docker_membersrvc                                                          "membersrvc"             5 minutes ago       Exited (2) 9 seconds ago                         docker_membersrvc

a87083f38064d7597e98031a56a1bc925e4e9e30406ea37c08ad2
102c0bba752 is my chaincodeID

---