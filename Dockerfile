FROM node:16
RUN apk add --no-cache python2 g++ make
WORKDIR /app
COPY . .
RUN npm install --production
CMD ["node", "src/index.js"]
EXPOSE 3000