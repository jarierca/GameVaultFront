
FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm cache clean --force
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
