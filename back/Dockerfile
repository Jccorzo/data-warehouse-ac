FROM mhart/alpine-node:12
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
ENTRYPOINT node index.js