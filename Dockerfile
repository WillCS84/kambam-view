FROM node:alpine

WORKDIR /src/

COPY package*.json ./

RUN npm install

EXPOSE 3000

COPY . .

CMD ["npm", "run", "dev"]