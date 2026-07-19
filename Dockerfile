FROM ghcr.io/cirruslabs/flutter:stable AS build

WORKDIR /web

COPY pubspec.yaml pubspec.lock ./

RUN flutter pub get

COPY . .
RUN flutter build web --release

FROM nginx:alpine

COPY --from=build /web/build/web /usr/share/nginx/html

EXPOSE 80

CMD echo "Flutter web app started on port 80" && nginx -g "daemon off;"