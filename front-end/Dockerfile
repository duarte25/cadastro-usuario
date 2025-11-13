FROM node:23

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN cp .env.example .env

RUN npm run build

EXPOSE 3000

ENV PORT=3000

CMD ["npm", "start"]