FROM node:22-alpine AS deps
WORKDIR /app/backend
COPY backend/package.json ./package.json
RUN npm install --omit=dev

FROM node:22-alpine AS runtime
WORKDIR /app/backend
COPY --from=deps /app/backend/node_modules ./node_modules
COPY backend/src ./src
COPY backend/package.json ./package.json

ENV NODE_ENV=production
EXPOSE 8080
CMD ["node", "src/server.js"]
