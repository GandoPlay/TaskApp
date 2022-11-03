FROM node:16
WORKDIR /app
COPY package.json .
COPY . ./ 
ENV PORT 3000
EXPOSE $PORT
CMD ["node","dist/main"]