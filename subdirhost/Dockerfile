FROM node:lts-alpine AS build-stage
WORKDIR /app/
COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx:1.12-alpine AS production-stage
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-stage /app/build/ ./
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]