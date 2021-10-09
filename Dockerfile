FROM node:12

# Create app directory
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y bash git openssh-server && apt-get install libfontconfig && apt-get install python && apt-get install make && apt-get install g++ && apt-get install --yes graphicsmagick 

ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install app dependencies
COPY package*.json ./

# RUN npm install
RUN npm install

# RUN INSTALL APIDOC GLOBALLY IN CONTAINER
RUN npm install apidoc -g

RUN ls -a


COPY . .

RUN npm run build
# RUN API DOC COMMAND
# RUN apidoc -i dist/controllers/  -o public/

EXPOSE 8080

# RUN SERVICE
CMD [ "node", "dist/index.js"]