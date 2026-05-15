# Use an official Node.js runtime as the base image
FROM node:22.22-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set the working directory in the container
WORKDIR /usr/src/client

# Copy package.json and ./pnpm-lock.yaml to the container
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .

# Install Node.js dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code to the container
COPY ./src ./src
COPY ./public ./public

# Copy config files to the container
COPY ./tsconfig.json .
COPY ./vite.config.ts .
COPY ./index.html .
COPY ./.env.testing .env

# Build your application
RUN pnpm start
RUN pnpm add -D serve

# Specify the command to start the server
CMD ["pnpm", "exec", "serve", "-s", "./dist", "-l", "5173"]
