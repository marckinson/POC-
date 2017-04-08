#!/bin/bash

WORK_DIR=$(dirname $0)
CURR_DIR=$(pwd)
cd ${WORK_DIR}
WORK_DIR=$(pwd)
cd ${CURR_DIR}
APP_LOG_DIR=${WORK_DIR}/logs

display_help()
{
	echo "Usage $0 [OPTIONS]
OPTIONS:
    -h|--help           Display this help message.
    -c|--clear          Clear the blockchain informations
                        (keyStore and chaincodeID).
    -i|--install        Reinstall al node dependencies.
    -s|--start          Start the node server.
"
}

clear_store()
{
	echo "Remove chaincode informations"
	rm -rf ${WORK_DIR}/chaincodeID.txt ${WORK_DIR}/keyValStore/ ${WORK_DIR}/uploads/* ${WORK_DIR}/logs/*
}

install_npm()
{
	echo "Install npm modules (WORK_DIR = ${WORK_DIR})"
	rm -rf ${WORK_DIR}/node_modules
	npm --prefix ${WORK_DIR} install ${WORK_DIR}
}

test_port()
{
	HOST=$1
	PORT=$2
	nmap ${HOST} -p ${PORT} 2>/dev/null | grep ${PORT} | grep -q open
	echo $?
}

START=false
ACTION=false
while [ ! -z "$1" ] ; do
	case "$1" in
		-h|--help)
			;;
		-c|--clear)
			clear_store
			ACTION=true
			;;
		-i|--install)
			install_npm
			ACTION=true
			;;
		-s|--start)
			START=true
			ACTION=true
			;;
		*)
			echo "Unknown option '$1'"
			display_help
			exit 0
			;;
	esac
	shift
done

if ! ${ACTION} ; then
	display_help
fi

if ! ${START} ; then
	exit 0
fi

# Exit on first error, print all commands.
set -ev
if [ ! -r ${APP_LOG_DIR} ] ; then
	mkdir ${APP_LOG_DIR}
fi

# Wait for the Hyperledger Fabric to start.
#while [ $(test_port localhost 7054) -ne 0 ] ; do sleep 1; done
#while [ $(test_port localhost 7050) -ne 0 ] ; do sleep 1; done

# Start node
npm --prefix ${WORK_DIR} start ${WORK_DIR}

exit 0
