FROM node:6.9.5

# Install required prereqs.
RUN apt-get -y update && apt-get -y install netcat nmap

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

ENV API_DIR=${WORKDIR}

# Update npm
# RUN npm install npm@latest -g
ADD https://www.npmjs.com/install.sh ./install.sh
RUN sh install.sh

# Install app dependencies
RUN sh ./initEnv.sh -f -X
RUN sh ./start-node.sh -c

CMD ["sh", "./start-node.sh", "-s"]

# Expose the port.
EXPOSE 5000
