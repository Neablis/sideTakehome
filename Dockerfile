FROM node:14
WORKDIR /usr/app
ADD . .

RUN yarn global add nodemon
RUN yarn

EXPOSE 3000