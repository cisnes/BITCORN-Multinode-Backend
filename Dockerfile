FROM node:10
WORKDIR /usr/scr/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 42420
CMD [ "node", "index.js" ]
