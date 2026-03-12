#!/bin/bash

# Pizza Deployment Script — run from local Mac, deploy to remote server
# Usage: ./deploy.sh

set -e

# ==================== CONFIG ====================
SERVER_IP="85.192.56.10"
SERVER_USER="root"
SERVER_PASSWORD="3I40pPJ4UqkD"
REMOTE_DIR="/opt/pizza"
# ================================================

SSH_OPTS="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o LogLevel=ERROR"
SSH_CMD="sshpass -p '${SERVER_PASSWORD}' ssh ${SSH_OPTS} ${SERVER_USER}@${SERVER_IP}"
RSYNC_CMD="sshpass -p '${SERVER_PASSWORD}' rsync -avz --delete -e 'ssh ${SSH_OPTS}'"

echo "=== Pizza Deploy: Local → ${SERVER_IP} ==="
echo ""

# 1. Sync project files to server (excluding unnecessary stuff)
echo "[1/4] Syncing project to server..."
eval ${RSYNC_CMD} \
    --exclude='node_modules' \
    --exclude='.git' \
    --exclude='.DS_Store' \
    --exclude='.idea' \
    --exclude='.vscode' \
    --exclude='letsencrypt' \
    --exclude='*.log' \
    ./ ${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}/

echo ""
echo "[2/4] Setting up Let's Encrypt storage..."
eval ${SSH_CMD} << 'REMOTE_SCRIPT_INIT'
mkdir -p /opt/pizza/letsencrypt
touch /opt/pizza/letsencrypt/acme.json
chmod 600 /opt/pizza/letsencrypt/acme.json
REMOTE_SCRIPT_INIT

echo ""
echo "[3/4] Stopping old containers & recreating network..."
eval ${SSH_CMD} << 'REMOTE_SCRIPT_NETWORK'
cd /opt/pizza

# Stop current services
docker compose -f docker-compose.server.yml down --remove-orphans 2>/dev/null || true

# Stop legacy containers
docker stop pizza-frontend-1 pizza-backend-1 pizza-db pizza-certbot pizza-nginx traefik 2>/dev/null || true
docker rm pizza-frontend-1 pizza-backend-1 pizza-db pizza-certbot pizza-nginx traefik 2>/dev/null || true

sleep 3

# Recreate network with MTU 1280 (fix for VPN/nested networks)
docker network rm pizza_net 2>/dev/null || true
docker network create --driver bridge --opt com.docker.network.driver.mtu=1280 pizza_net
echo "Network pizza_net created with MTU 1280"
REMOTE_SCRIPT_NETWORK

echo ""
echo "[4/4] Building services one by one..."
SERVICES="backend frontend auth cart order profile pizza-builder shell"
for svc in $SERVICES; do
    echo ""
    echo "--- Building: $svc ---"
    eval ${SSH_CMD} "cd /opt/pizza && docker compose -f docker-compose.server.yml build ${svc}"
done

echo ""
echo "[5/5] Starting all services..."
eval ${SSH_CMD} "cd /opt/pizza && docker compose -f docker-compose.server.yml up -d --force-recreate"
eval ${SSH_CMD} "cd /opt/pizza && docker compose -f docker-compose.server.yml ps"

echo ""
echo "=== Deployment complete! ==="
echo ""
echo "Sites:"
echo "  Monolith:        https://pizza.ew-production.ru"
echo "  Micro-frontends: https://micro.pizza.ew-production.ru"
echo "  API:             https://api.pizza.ew-production.ru"
echo ""
echo "MFE subdomains:"
echo "  - https://auth.pizza.ew-production.ru"
echo "  - https://builder.pizza.ew-production.ru"
echo "  - https://cart.pizza.ew-production.ru"
echo "  - https://profile.pizza.ew-production.ru"
echo "  - https://order.pizza.ew-production.ru"
echo ""
