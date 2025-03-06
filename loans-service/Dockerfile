FROM node:20-alpine 

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN apk add --no-cache curl \
    && curl -fsSL https://get.pnpm.io/install.sh | sh - \
    && export PATH="/root/.local/share/pnpm:$PATH" \
    && pnpm install --frozen-lockfile --shamefully-hoist

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]
