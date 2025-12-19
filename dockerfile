
FROM node:22.14.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g typescript
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]