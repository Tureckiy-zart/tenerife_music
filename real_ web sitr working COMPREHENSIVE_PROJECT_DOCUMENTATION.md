# Tenerife.Music - Полная документация проекта

## 📋 Оглавление

1. [Обзор проекта](#обзор-проекта)
2. [Техническая архитектура](#техническая-архитектура)
3. [Структура проекта](#структура-проекта)
4. [Компоненты и функциональность](#компоненты-и-функциональность)
5. [Страницы и маршруты](#страницы-и-маршруты)
6. [API и данные](#api-и-данные)
7. [Стилизация и дизайн](#стилизация-и-дизайн)
8. [Конфигурация](#конфигурация)
9. [Развертывание](#развертывание)
10. [Разработка](#разработка)

---

## 🎯 Обзор проекта

**Tenerife.Music** — это веб-платформа для агрегации музыкальных событий, площадок и контента на острове Тенерифе. Проект представляет собой современное SPA-приложение, построенное на Next.js 15 с TypeScript.

### Основные цели:
- Создание единой платформы для музыкальной сцены Тенерифе
- Агрегация событий, площадок и контента
- Удобный поиск и фильтрация музыкальных событий
- Интеграция с местными площадками и артистами

### Ключевые особенности:
- 🎵 **Агрегация событий** - сбор информации о концертах, фестивалях, клубных вечеринках
- 🏢 **Каталог площадок** - подробная информация о музыкальных площадках острова
- 📰 **Контент-платформа** - статьи и новости о музыкальной сцене
- 🔍 **Умный поиск** - фильтрация по жанрам, датам, локациям
- 📱 **Адаптивный дизайн** - оптимизация для всех устройств

---

## 🏗️ Техническая архитектура

### Технологический стек:

**Frontend:**
- **Next.js 15.5.5** - React фреймворк с App Router
- **TypeScript 5.2.2** - типизация
- **Tailwind CSS 3.3.3** - стилизация
- **Framer Motion 12.23.24** - анимации
- **React Hook Form 7.53.0** - управление формами

**UI компоненты:**
- **Radix UI** - доступные примитивы
- **Shadcn/ui** - готовые компоненты
- **Lucide React** - иконки
- **Headless UI** - интерактивные элементы

**Стилизация:**
- **Tailwind CSS** - utility-first CSS
- **CSS Variables** - кастомные свойства
- **Responsive Design** - адаптивность
- **Dark/Light themes** - поддержка тем

**Анимации:
- **Framer Motion** - сложные анимации
- **CSS Animations** - простые переходы
- **Intersection Observer** - анимации при скролле

### Архитектурные решения:

1. **App Router** - современная маршрутизация Next.js
2. **Server Components** - серверный рендеринг по умолчанию
3. **Client Components** - интерактивность где нужно
4. **Component Composition** - переиспользуемые компоненты
5. **Type Safety** - полная типизация TypeScript

---

## 📁 Структура проекта

```
tenerife_music/
├── app/                          # Next.js App Router
│   ├── about/                   # Страница "О нас"
│   ├── api/                     # API маршруты
│   │   ├── contact/            # Обработка контактных форм
│   │   └── subscribe/          # Подписка на рассылку
│   ├── contact/                # Страница контактов
│   ├── events/                 # Страница событий
│   ├── venues/                 # Страница площадок
│   ├── news/                   # Новости и статьи
│   ├── globals.css             # Глобальные стили
│   ├── layout.tsx              # Корневой layout
│   └── page.tsx                # Главная страница
│
├── components/                  # React компоненты
│   ├── ui/                     # UI компоненты (50+ файлов)
│   ├── hero.tsx                # Главный баннер
│   ├── events.tsx              # Секция событий
│   ├── venues.tsx              # Секция площадок
│   ├── articles.tsx            # Секция статей
│   ├── navigation.tsx          # Навигация
│   ├── footer.tsx             # Футер
│   └── subscription-modal.tsx  # Модальное окно подписки
│
├── data/                       # Статические данные
│   ├── events_tenerife.json    # События (70+ записей)
│   ├── venues_tenerife.json    # Площадки (15+ записей)
│   └── news.json              # Новости и статьи
│
├── lib/                        # Утилиты и типы
│   ├── types.ts               # TypeScript типы
│   ├── utils.ts               # Общие функции
│   └── db.ts                  # Конфигурация БД
│
├── public/                     # Статические файлы
│   ├── images/                # Изображения
│   ├── favicon.svg            # Иконка сайта
│   └── manifest.json          # PWA манифест
│
├── prisma/                     # Схема базы данных
│   └── schema.prisma          # Prisma схема
│
├── package.json               # Зависимости
├── tailwind.config.ts         # Конфигурация Tailwind
├── tsconfig.json              # Конфигурация TypeScript
└── next.config.js             # Конфигурация Next.js
```

---

## 🧩 Компоненты и функциональность

### Основные компоненты:

#### 1. **Hero** (`components/hero.tsx`)
**Функциональность:**
- Карусель из 5 изображений с автопереключением (5 сек)
- Анимированные плавающие элементы
- Модальные окна для подписки и превью
- Статистика (100+ событий, 50+ площадок, 24/7 обновления)

**Ключевые особенности:**
- Автоматическая ротация изображений
- Плавные переходы между слайдами
- Интерактивные кнопки с hover-эффектами
- Адаптивный дизайн для всех устройств

#### 2. **Events** (`components/events.tsx`)
**Функциональность:**
- Отображение событий в виде карточек
- Фильтрация по жанрам (All, Techno, House, Electronic, Jazz, Folk, Live Music)
- Модальное окно "Coming Soon" для билетов
- Анимации появления при скролле

**Данные:**
- 8 mock событий с полной информацией
- Изображения, описания, даты, площадки
- Жанровая классификация

#### 3. **Venues** (`components/venues.tsx`)
**Функциональность:**
- Каталог музыкальных площадок
- Детальная информация о каждой площадке
- Модальные окна с подробностями
- Интерактивная карта (заглушка)

**Типы площадок:**
- Concert Hall (Auditorio de Tenerife)
- Beach Club (Papagayo, Monkey)
- Nightclub (Tramps, NRG)
- Traditional venues

#### 4. **Articles** (`components/articles.tsx`)
**Функциональность:**
- Статьи о музыкальной сцене Тенерифе
- Модальные окна с полным контентом
- Категоризация по темам
- Адаптивная сетка

**Контент:**
- 3 подробные статьи
- Информация о фестивалях, традиционной музыке, площадках
- SEO-оптимизированный контент

#### 5. **Navigation** (`components/navigation.tsx`)
**Функциональность:**
- Адаптивное меню
- Мобильная навигация
- Плавные переходы
- Активные состояния

#### 6. **Footer** (`components/footer.tsx`)
**Функциональность:**
- Ссылки на разделы
- Социальные сети
- Контактная информация
- Копирайт

### UI компоненты (50+ файлов):

**Основные категории:**
- **Layout**: Card, Container, Separator
- **Forms**: Input, Button, Select, Checkbox, Radio
- **Navigation**: Tabs, Breadcrumb, Pagination
- **Feedback**: Alert, Toast, Progress, Skeleton
- **Overlay**: Dialog, Sheet, Popover, Tooltip
- **Data Display**: Table, Badge, Avatar
- **Media**: AspectRatio, Carousel

---

## 📄 Страницы и маршруты

### Главная страница (`app/page.tsx`)
**Структура:**
```
Navigation
├── Hero (карусель + CTA)
├── About (краткое описание)
├── Events (события с фильтрами)
├── Articles (статьи)
└── Venues (площадки)
Footer
```

### Страница "О нас" (`app/about/page.tsx`)
**Содержание:**
- Миссия проекта
- Статистика (500+ событий, 50+ площадок)
- Возможности платформы
- Призыв к действию

### Страница контактов (`app/contact/page.tsx`)
**Функциональность:**
- Контактная форма
- Информация о компании
- Социальные сети
- Обратная связь

### API маршруты:

#### `/api/subscribe` (POST)
**Функциональность:**
- Валидация email
- Сохранение подписки
- Обработка ошибок

**Параметры:**
```typescript
{
  email: string
}
```

**Ответ:**
```typescript
{
  message: string
  subscription: {
    id: number
    email: string
    createdAt: string
  }
}
```

#### `/api/contact` (POST)
**Функциональность:**
- Валидация формы
- Сохранение сообщения
- Проверка полей

**Параметры:**
```typescript
{
  name: string
  email: string
  message: string
}
```

---

## 🗄️ API и данные

### Статические данные:

#### События (`data/events_tenerife.json`)
**Структура записи:**
```typescript
{
  event_id: string
  name: string
  type: string
  genres: string[]
  tags: string[]
  start_date: string
  end_date: string
  timezone: string
  venue: {
    venue_id: string
    name: string
    address: string
    coordinates: { lat: number, lng: number }
  }
  price_min: number
  price_max: number
  currency: string
  description: string
  performers: string[]
  image_url: string
  ticket_url: string
  source: string
  source_url: string
  created_at: string
  metadata: {
    region: string
    data_version: string
    quality_score: number
  }
}
```

**Статистика:**
- 70+ событий
- Жанры: Classical, Opera, Jazz, Electronic, Folk, Rock
- Период: 2024-2026
- Площадки: Auditorio de Tenerife, Beach Clubs, Nightclubs

#### Площадки (`data/venues_tenerife.json`)
**Структура записи:**
```typescript
{
  venue_id: string
  name: string
  address: string
  coordinates: { lat: number, lng: number }
  type: string
  website: string
  events_count: number
}
```

**Типы площадок:**
- Concert Hall (концертные залы)
- Beach Club (пляжные клубы)
- Nightclub (ночные клубы)
- Traditional venues (традиционные площадки)

#### Новости (`data/news.json`)
**Структура записи:**
```typescript
{
  slug: string
  title: string
  date: string
  readTime: string
  excerpt: string
  content: string
}
```

### База данных (Prisma):

#### Схема (`prisma/schema.prisma`)
```prisma
model Subscription {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
}

model Contact {
  id        String   @id @default(cuid())
  name      String
  email     String
  message   String
  createdAt DateTime @default(now())
}
```

**Конфигурация:**
- PostgreSQL база данных
- Prisma ORM
- Автоматические миграции
- Типизированные запросы

---

## 🎨 Стилизация и дизайн

### Цветовая схема:

**Основные цвета:**
- **Primary**: `#003A4D` (тёмно-синий)
- **Secondary**: `#00A6A6` (бирюзовый)
- **Accent**: `#00C4C4` (светло-бирюзовый)
- **Background**: `#F9FAFB` (светло-серый)
- **Text**: `#1F2937` (тёмно-серый)

**Градиенты:**
- Hero: `from-[#003A4D] via-[#004A5D] to-[#00A6A6]`
- Cards: `from-[#003A4D] to-[#00536B]`
- Buttons: `from-[#00A6A6] to-[#00C4C4]`

### Типографика:

**Шрифты:**
- **Montserrat** - заголовки (font-montserrat)
- **Poppins** - основной текст (font-poppins)

**Размеры:**
- H1: `text-4xl md:text-6xl`
- H2: `text-3xl md:text-4xl`
- H3: `text-2xl md:text-3xl`
- Body: `text-base md:text-lg`

### Анимации:

**CSS анимации:**
```css
@keyframes float {
  0%, 100% { transform: translateY(0px) }
  50% { transform: translateY(-10px) }
}

@keyframes oceanWave {
  0%, 100% { transform: translateX(0) translateY(0) }
  25% { transform: translateX(-2px) translateY(-1px) }
  50% { transform: translateX(2px) translateY(1px) }
  75% { transform: translateX(-1px) translateY(-2px) }
}
```

**Framer Motion:**
- Появление элементов при скролле
- Hover эффекты
- Плавные переходы
- Stagger анимации

### Адаптивность:

**Breakpoints:**
- Mobile: `320px+`
- Tablet: `768px+`
- Desktop: `1024px+`
- Large: `1920px+`

**Grid системы:**
- Mobile: 1 колонка
- Tablet: 2 колонки
- Desktop: 3-4 колонки
- Large: 4+ колонок

---

## ⚙️ Конфигурация

### Next.js (`next.config.js`)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif']
  }
}
```

### TypeScript (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Tailwind CSS (`tailwind.config.ts`)
```typescript
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Кастомные цвета
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'ocean-wave': 'oceanWave 8s ease-in-out infinite',
      }
    }
  }
}
```

### Зависимости:

**Production:**
- Next.js 15.5.5
- React 18.2.0
- TypeScript 5.2.2
- Tailwind CSS 3.3.3
- Framer Motion 12.23.24

**Development:**
- ESLint 9.24.0
- Prettier 5.1.3
- TypeScript 5.2.2

**UI Libraries:**
- Radix UI (50+ компонентов)
- Shadcn/ui
- Headless UI
- Lucide React

---

## 🚀 Развертывание

### Локальная разработка:

```bash
# Установка зависимостей
npm install
# или
yarn install

# Запуск dev сервера
npm run dev
# или
yarn dev

# Открыть http://localhost:3000
```

### Production build:

```bash
# Создание production build
npm run build
# или
yarn build

# Запуск production сервера
npm start
# или
yarn start
```

### Переменные окружения:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/tenerife_music"

# Next.js
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

### Docker (опционально):

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🛠️ Разработка

### Рекомендуемые инструменты:

**IDE:**
- Visual Studio Code
- WebStorm

**Расширения VSCode:**
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
- Auto Rename Tag
- Bracket Pair Colorizer

### Git workflow:

```bash
# Создание ветки
git checkout -b feature/new-feature

# Коммит изменений
git add .
git commit -m "feat: add new feature"

# Push в репозиторий
git push origin feature/new-feature

# Создание Pull Request
```

### Code Style:

**ESLint правила:**
- TypeScript strict mode
- React hooks rules
- Import/export порядок
- Naming conventions

**Prettier конфигурация:**
- Single quotes
- Semicolons
- Trailing commas
- 2 spaces indentation

### Тестирование:

```bash
# Запуск линтера
npm run lint

# Проверка типов
npm run type-check

# Тестирование (если настроено)
npm run test
```

### Производительность:

**Оптимизации:**
- Image optimization (Next.js Image)
- Code splitting
- Lazy loading
- Bundle analysis
- Lighthouse audits

**Метрики:**
- First Contentful Paint
- Largest Contentful Paint
- Cumulative Layout Shift
- Time to Interactive

---

## 📊 Статистика проекта

### Размер кодовой базы:
- **Файлы**: 100+ файлов
- **Компоненты**: 50+ UI компонентов
- **Страницы**: 5 основных страниц
- **API routes**: 2 эндпоинта
- **Стили**: 1000+ строк CSS

### Данные:
- **События**: 70+ записей
- **Площадки**: 15+ записей
- **Статьи**: 5+ статей
- **Изображения**: 10+ изображений

### Производительность:
- **Lighthouse Score**: 90+
- **Bundle Size**: < 500KB
- **Load Time**: < 2s
- **SEO Score**: 95+

---

## 🔮 Планы развития

### Краткосрочные цели:
- [ ] Интеграция с реальной БД
- [ ] Система аутентификации
- [ ] Админ-панель
- [ ] Email уведомления

### Среднесрочные цели:
- [ ] Мобильное приложение
- [ ] API для партнеров
- [ ] Система рекомендаций
- [ ] Интеграция с билетными системами

### Долгосрочные цели:
- [ ] Расширение на другие острова
- [ ] AI-рекомендации
- [ ] Виртуальные события
- [ ] Blockchain интеграция

---

## 📞 Поддержка

### Контакты:
- **Email**: info@tenerife.music
- **GitHub**: [tenerife-music](https://github.com/tenerife-music)
- **Документация**: [docs.tenerife.music](https://docs.tenerife.music)

### Сообщество:
- **Discord**: [Tenerife Music Community](https://discord.gg/tenerife-music)
- **Telegram**: [@tenerife_music](https://t.me/tenerife_music)
- **Twitter**: [@TenerifeMusic](https://twitter.com/TenerifeMusic)

---

*Документация обновлена: 2024*
*Версия проекта: 1.0.0*
*Статус: В разработке*
