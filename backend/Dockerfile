FROM node:22-alpine AS runtime
WORKDIR /app

COPY backend/src ./backend/src
COPY backend/package.json ./backend/package.json

WORKDIR /app/backend
ENV NODE_ENV=production
EXPOSE 8080
CMD ["node", "src/server.js"]
