FROM ghcr.io/cirruslabs/flutter:stable AS build

WORKDIR /web

COPY pubspec.yaml pubspec.lock ./

RUN flutter pub get

COPY . .
RUN flutter build web --release

FROM nginx:alpine

COPY --from=build /web/build/web /usr/share/nginx/html

EXPOSE 80

CMD echo "Chetan, your docker image is created and available at http://localhost:8080" && nginx -g "daemon off;"