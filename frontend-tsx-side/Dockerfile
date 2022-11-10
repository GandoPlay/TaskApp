FROM node:15
WORKDIR /app
COPY package.json .
RUN npm --force install
COPY . . 
EXPOSE 3000
CMD ["npm","start"]