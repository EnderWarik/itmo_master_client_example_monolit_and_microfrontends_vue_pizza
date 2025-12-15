#!/bin/bash

# Pizza Deployment Script (Traefik + Prod Mode)
# Run on the production server

set -e

echo "=== Pizza Deployment Script (MTU 1280 Fix) ==="
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Please run as root or with sudo"
    exit 1
fi

# Prepare Traefik Let's Encrypt persistence
echo "Setting up Let's Encrypt storage..."
mkdir -p letsencrypt
touch letsencrypt/acme.json
chmod 600 letsencrypt/acme.json

# Stop potential conflicting containers
echo "Stopping old containers..."
docker stop pizza-frontend-1 pizza-backend-1 pizza-db pizza-certbot pizza-nginx spark_space_api-spark-api-1 spark_space-spark-frontend-1 spark-db traefik 2>/dev/null || true
docker rm pizza-frontend-1 pizza-backend-1 pizza-db pizza-certbot pizza-nginx spark_space_api-spark-api-1 spark_space-spark-frontend-1 spark-db traefik 2>/dev/null || true

# Stop current project containers if running and remove orphans
# This is crucial to release the network before removing it
echo "Stopping current services..."
docker compose -f docker-compose.server.yml down --remove-orphans || true

echo "Waiting for network cleanup..."
sleep 5

# Recreate network with custom MTU to avoid packet loss issues
# Using 1280 which is the safe floor (minimum IPv6 MTU), very reliable for nested VPNs
echo "Recreating network 'pizza_net' with MTU 1280..."
docker network rm pizza_net 2>/dev/null || true
docker network create --driver bridge --opt com.docker.network.driver.mtu=1280 pizza_net

# Verify MTU
echo "Verifying network configuration..."
docker network inspect pizza_net | grep "mtu" || echo "Warning: MTU setting check failed"

echo ""
echo "=== Building and starting services ==="
# Build and start using the server compose file
# Using --build to ensure Dockerfile.prod is built
docker compose -f docker-compose.server.yml up -d --build --force-recreate

echo ""
echo "=== Deployment complete! ==="
echo "Traefik is resolving certificates. It might take a minute."
echo "Check status: docker compose -f docker-compose.server.yml ps"
echo ""
echo "Sites should be available at:"
echo "  - https://builder.pizza.ew-production.ru (PIZZA BUILDER ONLY)"
echo "  - https://api.pizza.ew-production.ru"
echo "  - http://85.192.56.10:8080 (Direct Access)"
echo ""
