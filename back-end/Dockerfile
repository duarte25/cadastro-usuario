FROM node:23

WORKDIR /node-app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN cp .env.example .env

RUN npm run build

EXPOSE 3020

# Ponto de partida
CMD ["npm", "start"] 