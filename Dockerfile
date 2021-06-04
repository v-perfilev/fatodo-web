FROM node:alpine as build

WORKDIR /app

COPY . ./
RUN rm -rf dist
RUN npm install

ARG BASE_URL
ARG API_URL
ARG RECAPTCHA_KEY

RUN npm run-script build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
