FROM node:18-alpine
ENV MONGO_DB_USERNAME=chetan3625 \
    MONGO_DB_PASSWORD=chetan3625 

WORKDIR /server
    COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]