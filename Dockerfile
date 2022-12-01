FROM node:16
WORKDIR /App
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 7000
CMD ["node", "index.js"]
