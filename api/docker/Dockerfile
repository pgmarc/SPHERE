# Use an official Node.js runtime as the base image
FROM node:22.22-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install minizinc
RUN apt-get update && apt-get install -y minizinc && apt-get clean

# Set the working directory in the container
WORKDIR /usr/src/server

# Copy package.json and ./pnpm-lock.yaml to the container
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .

# Install Node.js dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code to the container
COPY ./src/main ./src/main

# Copy tsconfig.json to the container
COPY ./tsconfig.json .

# Copy migration script to the container
COPY ./scripts/migrate.sh ./scripts/migrate.sh

# Build your application
RUN pnpm run build

COPY ./docker/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Specify the command to start the server
CMD [ "/usr/src/server/entrypoint.sh" ]