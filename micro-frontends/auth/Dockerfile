FROM node:20 AS builder

WORKDIR /app

# Copy package files
COPY package.json ./
COPY packages/ /packages/

# Install dependencies including @pizza/common from local packages
RUN npm install && \
    mkdir -p node_modules/@pizza && \
    cp -r /packages/common node_modules/@pizza/common

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
