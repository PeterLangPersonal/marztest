FROM node:16

WORKDIR /api.orders

RUN apt-get update

COPY package*.json ./
RUN npm ci

EXPOSE 5002

COPY . .
CMD ["node", "index.ts"]