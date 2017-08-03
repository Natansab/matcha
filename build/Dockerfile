FROM node:latest

ENV NODE_ENV production
ADD package.json /package.json
RUN npm install --production

ADD dist/ /dist

EXPOSE 5000
CMD [ "node", "/dist/index.js" ]
