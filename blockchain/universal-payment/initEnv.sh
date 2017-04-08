#!/bin/bash

curr_dir=$(pwd)
env_dir=$(dirname $0)
cd ${env_dir}
env_dir=$(pwd)
cd ${curr_dir}

DEFAULT_APP_DIR="${env_dir}"
APP_DIR=${APP_DIR:-${DEFAULT_APP_DIR}}

FORCE=false
DEBUG=false

while [ ! -z "$1" ] ; do
	case $1 in
		-f|--force)
			FORCE=true
			;;
		-X|--debug)
			DEBUG=true
			;;
	esac
	shift
done
${DEBUG} && echo "Env dir: ${env_dir}"

npm_dir="${APP_DIR}"
vendor_dir="${npm_dir}/chaincode/src/universal_payment/vendor/github.com/hyperledger"
fabric_dir="${vendor_dir}/fabric"
git_url="https://github.com/hyperledger/fabric.git"
fabric_branch="v0.6"

${DEBUG} && echo "NPM path = '${npm_dir}'
Vendor path = '${vendor_dir}'
Fabric path = '${fabric_dir}'
GutHub Fabric URL = '${git_url}'
GutHub Fabric Version = '${fabric_branch}'"

if ${FORCE} ; then
	${DEBUG} && echo "Force remove '${vendor_dir}'"
	rm -rf ${vendor_dir}
fi

mkdir -p ${vendor_dir} 2>/dev/null
cd ${vendor_dir}

${DEBUG} && echo "Actual dir: $(pwd)"
${DEBUG} && echo "Clone from ${git_url} to ${fabric_dir}"

git clone ${git_url} ${fabric_dir}

cd ${fabric_dir}
${DEBUG} && echo "Actual dir: $(pwd)"
git fetch --all

${DEBUG} && echo "Move to branch ${fabric_branch}"
git checkout ${fabric_branch}
git pull origin ${fabric_branch}

${DEBUG} && echo "Remove git folder '${fabric_dir}/.git*'"
rm -rf ${fabric_dir}/.git*

cd ${npm_dir}
${DEBUG} && echo "Actual dir: $(pwd)"

if ${FORCE} ; then
	${DEBUG} && echo "Force remove '${npm_dir}/node_modules'"
	rm -rf ${npm_dir}/node_modules
fi
${DEBUG} && echo "Install NPM packages..."
npm install
ret_code=$?
if ${DEBUG} ; then
	[ ${ret_code} -eq 0 ] && echo "NPM packages Installed" || echo "Could not install NPM packages"
fi

cd ${curr_dir}

exit 0
