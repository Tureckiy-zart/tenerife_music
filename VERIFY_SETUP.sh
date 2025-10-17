#!/bin/bash
echo "🔍 Verifying Tenerife.music Backend Foundation Setup..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

passed=0
failed=0

# Check function
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
        ((passed++))
    else
        echo -e "${RED}❌ $1${NC}"
        ((failed++))
    fi
}

# 1. Check packages exist
echo "📦 Checking packages..."
[ -d "packages/db" ]; check "packages/db exists"
[ -d "packages/domain" ]; check "packages/domain exists"
[ -d "packages/shared" ]; check "packages/shared exists"
echo ""

# 2. Check Prisma schema
echo "🗄️ Checking Prisma schema..."
[ -f "packages/db/prisma/schema.prisma" ]; check "schema.prisma exists"
grep -q "model Event" packages/db/prisma/schema.prisma; check "Event model defined"
grep -q "enum DayNight" packages/db/prisma/schema.prisma; check "DayNight enum defined"
grep -q "model RadioStation" packages/db/prisma/schema.prisma; check "RadioStation model defined"
echo ""

# 3. Check seed file
echo "🌱 Checking seed data..."
[ -f "packages/db/prisma/seed.ts" ]; check "seed.ts exists"
grep -q "encodeGeohash" packages/db/prisma/seed.ts; check "Geohash implementation present"
grep -q "30 events" packages/db/prisma/seed.ts; check "Event seeding configured"
echo ""

# 4. Check Zod schemas
echo "✅ Checking Zod schemas..."
[ -f "packages/db/src/zod.ts" ]; check "zod.ts exists"
grep -q "CreateEventSchema" packages/db/src/zod.ts; check "Event validation schemas defined"
grep -q "I18nTextSchema" packages/db/src/zod.ts; check "i18n schemas defined"
echo ""

# 5. Check domain services
echo "🏗️ Checking domain services..."
[ -f "packages/domain/src/events/service.ts" ]; check "EventsService exists"
[ -f "packages/domain/src/events/repository.ts" ]; check "EventRepository interface exists"
grep -q "createEvent" packages/domain/src/events/service.ts; check "createEvent method implemented"
grep -q "approveEvent" packages/domain/src/events/service.ts; check "approveEvent method implemented"
grep -q "listApprovedEvents" packages/domain/src/events/service.ts; check "listApprovedEvents method implemented"
echo ""

# 6. Check shared utilities
echo "🔧 Checking shared utilities..."
[ -f "packages/shared/src/errors.ts" ]; check "Error classes exist"
[ -f "packages/shared/src/geohash.ts" ]; check "Geohash utilities exist"
[ -f "packages/shared/src/i18n.ts" ]; check "i18n helpers exist"
grep -q "DomainError" packages/shared/src/errors.ts; check "DomainError class defined"
grep -q "encodeGeohash" packages/shared/src/geohash.ts; check "Geohash encoder defined"
grep -q "getTranslation" packages/shared/src/i18n.ts; check "Translation helper defined"
echo ""

# 7. Check documentation
echo "📚 Checking documentation..."
[ -f "packages/db/README.md" ]; check "DB README exists"
[ -f "BACKEND_FOUNDATION_README.md" ]; check "Root README exists"
[ -f ".env.example" ]; check "Root .env.example exists"
[ -f "packages/db/.env.example" ]; check "DB .env.example exists"
grep -q "erDiagram" packages/db/README.md; check "ERD diagram present"
echo ""

# 8. Check all bounded contexts
echo "🎯 Checking bounded contexts..."
[ -f "packages/domain/src/users/repository.ts" ]; check "UsersDomain repository"
[ -f "packages/domain/src/orgs/repository.ts" ]; check "OrgsDomain repository"
[ -f "packages/domain/src/content/repository.ts" ]; check "ContentDomain repository"
[ -f "packages/domain/src/radio/repository.ts" ]; check "RadioDomain repository"
[ -f "packages/domain/src/ads/repository.ts" ]; check "AdsDomain repository"
[ -f "packages/domain/src/moderation/repository.ts" ]; check "ModerationDomain repository"
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}Passed: $passed${NC}"
if [ $failed -gt 0 ]; then
    echo -e "${RED}Failed: $failed${NC}"
else
    echo -e "${GREEN}Failed: $failed${NC}"
fi
echo ""

if [ $failed -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Backend foundation is ready.${NC}"
    echo ""
    echo "🚀 Next steps:"
    echo "  1. Copy .env.example to .env and configure DATABASE_URL"
    echo "  2. cd packages/db && pnpm install && pnpm db:generate"
    echo "  3. pnpm db:migrate"
    echo "  4. pnpm db:seed"
    echo "  5. pnpm db:studio"
    exit 0
else
    echo -e "${RED}❌ Some checks failed. Please review the setup.${NC}"
    exit 1
fi
