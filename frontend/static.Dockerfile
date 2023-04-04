# from nginx
FROM nginx:latest as prod

EXPOSE 80

COPY nginx.conf /etc/nginx/nginx.conf
COPY . /var/www/