#FROM keymetrics/pm2:latest-alpine
FROM node
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
EXPOSE 3000

#CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
