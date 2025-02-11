# 1) Build stage: compile the frontend (React/Vue) with Node
FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY package*.json yarn.lock* ./

RUN yarn install --frozen-lockfile || npm install

COPY . .

RUN yarn build || npm run build

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
