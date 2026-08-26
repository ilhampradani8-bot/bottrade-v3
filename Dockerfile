# Multi-stage Dockerfile for BitTrade V3 AssemblyScript Wasm Engine

FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency configs
COPY package.json asconfig.json ./

# Install dependencies including AssemblyScript compiler
RUN npm install

# Copy source files
COPY assembly/ ./assembly/
COPY server/ ./server/
COPY web-ui/ ./web-ui/

# Build WebAssembly optimized binary (.wasm)
RUN npm run asbuild

# Production Stage
FROM node:20-alpine AS runner

WORKDIR /app

COPY package.json ./
RUN npm install --only=production

# Copy compiled Wasm binary and server code from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/server ./server
COPY --from=builder /app/web-ui ./web-ui

EXPOSE 8090

ENV PORT=8090

# Start Wasm Host Server
CMD ["npx", "ts-node", "server/index.ts"]
