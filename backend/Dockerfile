FROM node:15
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

COPY . ./ 
# use EXPOSE command to have our port mapped by the docker daemon

ENV PORT 5000
EXPOSE $PORT

CMD ["node","dist/main"]