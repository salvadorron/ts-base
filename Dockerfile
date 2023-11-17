FROM node:16-slim

WORKDIR /usr/src/app
COPY . ./

RUN yarn install --frozen-lockfile
RUN yarn build
USER node

CMD [ "yarn", "start" ]