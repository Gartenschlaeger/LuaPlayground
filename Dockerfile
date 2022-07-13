FROM node:16 AS build
WORKDIR /src
COPY . .
RUN yarn --frozen-lockfile && yarn build

FROM node:16-slim AS runtime
RUN apt-get update && apt-get install -y lua5.3
WORKDIR /app
COPY --from=build /src/node_modules ./node_modules
COPY --from=build /src/dist .
COPY --from=build /src/web /web
EXPOSE 8080
CMD [ "node", "/app/index.js" ]