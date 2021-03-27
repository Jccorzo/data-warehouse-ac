FROM mhart/alpine-node:12
ENV MONGO_URL=host.docker.internal
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
ENTRYPOINT node index.js