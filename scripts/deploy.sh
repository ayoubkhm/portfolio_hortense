#!/usr/bin/env bash
#
# Déploiement portfolio Hortense vers le VPS
# ─────────────────────────────────────────────
# Ce script synchronise UNIQUEMENT le code source vers le VPS.
# Il ne touche JAMAIS aux données d'Hortense :
#   - prisma/dev.db    (contenu éditable depuis /admin)
#   - public/uploads/  (photos/vidéos uploadées depuis /admin)
#   - .env             (config prod)
#
# Usage : ./scripts/deploy.sh

set -euo pipefail

# ─── Config ──────────────────────────────────────────────────────────────────
VPS_USER="root"
VPS_HOST="217.160.64.173"
VPS_PATH="/var/www/hortense"
PM2_APP="hortense"

# ─── Couleurs ────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# ─── Pré-vérifications ───────────────────────────────────────────────────────
echo -e "${BLUE}━━━ Pré-vérifications ━━━${NC}"

if [[ ! -f "package.json" ]] || [[ ! -d "src/app" ]]; then
  echo -e "${RED}✗ Lance ce script depuis la racine du projet portfolio_hortense${NC}"
  exit 1
fi

if ! command -v rsync >/dev/null 2>&1; then
  echo -e "${RED}✗ rsync n'est pas installé localement${NC}"
  exit 1
fi

if ! ssh -o BatchMode=yes -o ConnectTimeout=5 "${VPS_USER}@${VPS_HOST}" 'echo ok' >/dev/null 2>&1; then
  echo -e "${RED}✗ Connexion SSH au VPS impossible (${VPS_USER}@${VPS_HOST})${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Environnement OK${NC}"

# ─── Build local (validation) ────────────────────────────────────────────────
echo -e "\n${BLUE}━━━ Build local (validation) ━━━${NC}"
echo -e "${YELLOW}On build en local pour catch les erreurs AVANT d'envoyer sur le VPS.${NC}"
npm run build

# ─── Synchronisation ─────────────────────────────────────────────────────────
echo -e "\n${BLUE}━━━ Sync du code vers ${VPS_USER}@${VPS_HOST}:${VPS_PATH} ━━━${NC}"
echo -e "${YELLOW}Exclusions critiques (contenu d'Hortense protégé) :${NC}"
echo -e "  ${YELLOW}• prisma/dev.db*  → DB de prod${NC}"
echo -e "  ${YELLOW}• public/uploads/ → fichiers uploadés via admin${NC}"
echo -e "  ${YELLOW}• .env            → config prod${NC}"

rsync -avz --delete \
  --exclude='node_modules/' \
  --exclude='.next/' \
  --exclude='.git/' \
  --exclude='.env' \
  --exclude='.env.local' \
  --exclude='.env.*.local' \
  --exclude='prisma/dev.db' \
  --exclude='prisma/dev.db-journal' \
  --exclude='prisma/*.db' \
  --exclude='prisma/*.db-*' \
  --exclude='public/uploads/' \
  --exclude='*.tsbuildinfo' \
  --exclude='.DS_Store' \
  --exclude='.claude/' \
  --exclude='reco_dardouin/' \
  ./ "${VPS_USER}@${VPS_HOST}:${VPS_PATH}/"

# ─── Build + migrate + restart sur le VPS ────────────────────────────────────
echo -e "\n${BLUE}━━━ Install + build + restart sur le VPS ━━━${NC}"

ssh "${VPS_USER}@${VPS_HOST}" "set -euo pipefail; \
  cd ${VPS_PATH} && \
  echo '→ npm ci' && \
  npm ci && \
  echo '→ prisma generate' && \
  npx prisma generate && \
  echo '→ prisma migrate deploy (safe : applique seulement les migrations non appliquées, ne touche pas aux données)' && \
  npx prisma migrate deploy && \
  echo '→ next build' && \
  npm run build && \
  echo '→ pm2 restart ${PM2_APP}' && \
  pm2 restart ${PM2_APP} --update-env"

# ─── Done ────────────────────────────────────────────────────────────────────
echo -e "\n${GREEN}━━━ ✓ Déploiement terminé ━━━${NC}"
echo -e "${GREEN}🌐 https://hortensederuidiaz.fr${NC}"
