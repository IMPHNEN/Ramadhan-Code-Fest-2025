FROM golang:1.23-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git

COPY . .

RUN go mod tidy && go build -o main .

FROM alpine:latest AS runtime

WORKDIR /app

RUN apk add --no-cache \
    chromium \
    chromium-chromedriver \
    ca-certificates \
    tzdata \
    dbus \
    dumb-init \
    font-noto \
    font-noto-cjk \
    font-noto-emoji \
    python

ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_FLAGS="--headless --no-sandbox --disable-gpu --disable-software-rasterizer --disable-dev-shm-usage"
ENV XDG_CONFIG_HOME=/tmp/.chromium
ENV XDG_CACHE_HOME=/tmp/.chromium
ENV DISPLAY=:99

RUN mkdir -p /tmp/.chromium && chmod -R 777 /tmp/.chromium

COPY --from=builder /app/main .
EXPOSE 7860

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["./main"]
