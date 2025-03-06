FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json ./

RUN pnpm install --shamefully-hoist 

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]
