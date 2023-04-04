# this is used when deploying to prod
FROM node:14 as base

WORKDIR /app

# copy dependencies and install
COPY frontend/package*.json .

COPY frontend/yarn.lock .

COPY frontend .

RUN yarn install

FROM base as dev

CMD ["yarn", "export"]

# for prod env, build and host with nginx
FROM base as int

RUN yarn build

# from nginx
FROM nginx:latest as prod

EXPOSE 443

COPY frontend/nginx.conf /etc/nginx/nginx.conf
COPY --from=int /app/out/ /var/www/