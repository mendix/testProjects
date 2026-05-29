# This file provides an example on how to start the runtime in Docker.
# It is based on the configuration named Default.

FROM eclipse-temurin:21-jdk

# Set working directory
WORKDIR /mendix

# Copy Mendix app files into the image
COPY ./app ./app
COPY ./bin ./bin
COPY ./etc ./etc
COPY ./lib ./lib

# Environment variables
ENV MX_LOG_LEVEL=info
ENV M2EE_ADMIN_PASS=${M2EE_ADMIN_PASS}

# Expose ports
EXPOSE 8090
EXPOSE 8080

# Start command
HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

CMD ["./bin/start"]
