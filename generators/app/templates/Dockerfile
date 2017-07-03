FROM node:alpine

COPY package.json /usr/src/app/package.json
WORKDIR /usr/src/app
RUN npm install --production

COPY lib /usr/src/app/lib

CMD ["npm", "start"]
