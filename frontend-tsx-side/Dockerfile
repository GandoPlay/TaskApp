FROM node:15
WORKDIR /app
COPY package.json .
RUN npm install -g npm@9.1.1
COPY . . 
ENV REACT_APP_NAME=myName
EXPOSE 3000
CMD ["npm","start"]