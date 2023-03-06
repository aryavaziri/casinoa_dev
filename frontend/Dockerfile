# Use an official node runtime as a parent image
FROM node:16.3.0-alpine

WORKDIR /app/

# Install dependencies
COPY package.json yarn.lock /app/

RUN npm i react

# Add rest of the client code
COPY . /app/frontend/

EXPOSE 3000

CMD npm start
