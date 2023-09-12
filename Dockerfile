FROM node:latest
WORKDIR /app
COPY ./package.* ./
RUN npm install
COPY . .
RUN ["npm", "run", "build"]
CMD ["node", "dist/index.js"]
