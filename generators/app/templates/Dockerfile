FROM node:alpine

COPY package.json yarn.lock /usr/src/app/
WORKDIR /usr/src/app
RUN yarn install --production

COPY lib /usr/src/app/lib

CMD ["yarn", "start"]
