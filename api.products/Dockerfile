FROM node:16

WORKDIR /api.products

RUN apt-get update

COPY package*.json ./
RUN npm ci

EXPOSE 5002

COPY . .
CMD ["npm", "start"]