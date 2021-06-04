FROM node:alpine as build

WORKDIR /app

COPY . ./
RUN rm -rf dist
RUN npm install

ARG BASE_URL
ARG API_URL
ARG RECAPTCHA_KEY

ENV BASE_URL=$BASE_URL
ENV API_URL=$API_URL
ENV RECAPTCHA_KEY=$RECAPTCHA_KEY

RUN npm run-script build

FROM nginx:alpine

ARG BASE_URL
ARG API_URL
ARG RECAPTCHA_KEY

ENV BASE_URL=$BASE_URL
ENV API_URL=$API_URL
ENV RECAPTCHA_KEY=$RECAPTCHA_KEY

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
