#!/usr/bin/env bash

set -Eeuo pipefail

# === минимальный конфиг ===

SSH_HOST="${SSH_HOST:-85.192.56.10}"
SSH_USER="${SSH_USER:-root}"
SSH_PORT="${SSH_PORT:-22}"
SSH_IDENTITY="${SSH_IDENTITY:-}"             # например: ~/.ssh/id_ed25519
REMOTE_DIR="${REMOTE_DIR:-/root/pizza}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.yml}"
COMPOSE_PROJECT_NAME="${COMPOSE_PROJECT_NAME:-pizza}"

# === ssh/scp опции ===

SSH_OPTS=(-p "${SSH_PORT}" -o StrictHostKeyChecking=accept-new)
SCP_OPTS=(-P "${SSH_PORT}" -o StrictHostKeyChecking=accept-new)
[[ -n "${SSH_IDENTITY}" ]] && { SSH_OPTS+=(-i "${SSH_IDENTITY}"); SCP_OPTS+=(-i "${SSH_IDENTITY}"); }

remote() { ssh "${SSH_OPTS[@]}" "${SSH_USER}@${SSH_HOST}" "bash -lc 'unset DOCKER_HOST; $*'"; }

copy_env() {
  local src="${ENV_SRC:-.env.prod}"
  local dest="${REMOTE_DIR}/.env"
  if [ ! -f "${src}" ]; then
    echo "[env] '${src}' not found, skipping upload"
    return 0
  fi
  echo "[env] upload ${src} -> ${dest}"
  ssh "${SSH_OPTS[@]}" "${SSH_USER}@${SSH_HOST}" "mkdir -p '${REMOTE_DIR}'"
  scp "${SCP_OPTS[@]}" "${src}" "${SSH_USER}@${SSH_HOST}:${dest}"
}

echo "[1/3] copy -> ${SSH_USER}@${SSH_HOST}:${REMOTE_DIR}"
ssh "${SSH_OPTS[@]}" "${SSH_USER}@${SSH_HOST}" "mkdir -p '${REMOTE_DIR}'"
rsync -az --delete \
  --exclude .git --exclude node_modules --exclude .cache --exclude dist \
  -e "ssh ${SSH_OPTS[*]}" ./ "${SSH_USER}@${SSH_HOST}:${REMOTE_DIR}/"

copy_env

echo "[2/3] build (docker compose build)"
remote "cd '${REMOTE_DIR}' && docker compose -p '${COMPOSE_PROJECT_NAME}' -f '${COMPOSE_FILE}' build"

echo "[3/3] up (docker compose up -d)"
remote "cd '${REMOTE_DIR}' && docker compose -p '${COMPOSE_PROJECT_NAME}' -f '${COMPOSE_FILE}' up -d"

echo "Done."


