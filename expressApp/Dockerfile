FROM node:alpine3.15
EXPOSE 5000
ENV NODE_ENV=production
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
CMD node index.js