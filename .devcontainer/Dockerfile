FROM mcr.microsoft.com/devcontainers/base:bookworm

# Install Adoptium JDK 21 (required by MxBuild), Node.js 22, and utility tools
RUN apt-get update && apt-get install -y --no-install-recommends wget apt-transport-https gpg ca-certificates curl && \
    wget -qO - https://packages.adoptium.net/artifactory/api/gpg/key/public | gpg --dearmor -o /etc/apt/keyrings/adoptium.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/adoptium.gpg] https://packages.adoptium.net/artifactory/deb bookworm main" > /etc/apt/sources.list.d/adoptium.list && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
       temurin-21-jdk \
       nodejs \
       postgresql-client \
       kafkacat \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install playwright-cli and Chromium with all system dependencies (must run as root)
RUN npm install -g @playwright/cli@latest && \
    npx playwright install --with-deps chromium
