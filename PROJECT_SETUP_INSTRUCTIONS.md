# Tenerife.Music - Инструкция по установке и запуску проекта

## 📦 Структура проекта

Проект создан на базе **Next.js 14.2.28** с TypeScript, Tailwind CSS и Shadcn UI компонентами.

### Основные файлы и папки:

```
tenerife_music/
└── nextjs_space/
    ├── app/                      # Next.js App Router
    │   ├── api/                 # API маршруты
    │   │   ├── contact/        # Отправка контактных форм
    │   │   └── subscribe/      # Подписка на newsletter
    │   ├── contact/            # Страница контактов
    │   ├── globals.css         # Глобальные стили
    │   ├── layout.tsx          # Корневой layout
    │   └── page.tsx            # Главная страница
    │
    ├── components/              # React компоненты
    │   ├── ui/                 # Shadcn UI компоненты (50+ файлов)
    │   ├── about.tsx           # О проекте
    │   ├── articles.tsx        # Статьи о музыкальной сцене
    │   ├── contact-form.tsx    # Форма контактов
    │   ├── events.tsx          # Предстоящие события
    │   ├── footer.tsx          # Футер
    │   ├── hero.tsx            # Главный баннер с каруселью
    │   ├── navigation.tsx      # Навигация
    │   ├── subscription-modal.tsx  # Модальное окно подписки
    │   ├── theme-provider.tsx  # Провайдер темы
    │   └── venues.tsx          # Площадки
    │
    ├── hooks/                   # React хуки
    │   └── use-toast.ts        # Toast уведомления
    │
    ├── lib/                     # Утилиты
    │   ├── db.ts               # (заготовка для БД)
    │   ├── types.ts            # TypeScript типы
    │   └── utils.ts            # Общие функции
    │
    ├── public/                  # Статические файлы
    │   ├── hero-1.jpg          # Изображения для карусели
    │   ├── hero-2.jpg
    │   ├── hero-3.jpg
    │   ├── hero-4.jpg
    │   ├── hero-5.jpg
    │   ├── favicon.svg         # Иконка сайта
    │   └── manifest.json       # PWA манифест
    │
    ├── package.json            # Зависимости проекта
    ├── tsconfig.json           # TypeScript конфигурация
    ├── tailwind.config.ts      # Tailwind конфигурация
    ├── next.config.js          # Next.js конфигурация
    └── components.json         # Shadcn UI конфигурация
```

## 🚀 Установка и запуск

### 1. Скачайте проект

Нажмите кнопку **"Files"** в правом верхнем углу интерфейса и скачайте файл:
- `tenerife_music_project.tar.gz`

### 2. Распакуйте архив

```bash
tar -xzf tenerife_music_project.tar.gz
cd tenerife_music
```

### 3. Установите зависимости

**Важно:** Проект использует **Yarn** как пакетный менеджер.

```bash
# Установите yarn если его нет
npm install -g yarn

# Установите зависимости
yarn install
```

### 4. Запустите проект

```bash
# Development режим
yarn dev
```

Откройте браузер: [http://localhost:3000](http://localhost:3000)

### 5. Production build

```bash
# Создать production build
yarn build

# Запустить production сервер
yarn start
```

## 🛠️ Работа в VSCode

### Рекомендуемые расширения:

1. **ESLint** - Для линтинга кода
2. **Prettier** - Форматирование кода
3. **Tailwind CSS IntelliSense** - Автодополнение Tailwind классов
4. **TypeScript** - Поддержка TypeScript

### Настройки для VSCode (.vscode/settings.json):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## 📝 Основные команды

```bash
yarn dev          # Запуск dev сервера
yarn build        # Production build
yarn start        # Запуск production сервера
yarn lint         # Проверка кода линтером
```

## 🎨 Дизайн-система

### Цвета:
- **Основной:** `#003A4D` (тёмный синий)
- **Акцент:** `#00A6A6` (бирюзовый)
- **Hover:** `#00C4C4` (светло-бирюзовый)

### Шрифты:
- **Montserrat** - для заголовков (font-montserrat)
- **Poppins** - для основного текста (font-poppins)

## 🔧 Компоненты

### Главные компоненты:

1. **Hero** - Карусель с 5 изображениями, автопереключение каждые 5 секунд
2. **Events** - Фильтр по жанрам, модальное окно "Coming Soon"
3. **Venues** - Подборка музыкальных площадок
4. **Articles** - Статьи с возможностью раскрытия в модальном окне
5. **Contact** - Форма обратной связи

### API Routes:

- `POST /api/subscribe` - Подписка на newsletter
- `POST /api/contact` - Отправка контактной формы

## 📱 Адаптивность

Проект полностью адаптирован для:
- Мобильных устройств (320px+)
- Планшетов (768px+)
- Десктопов (1024px+)
- Широких экранов (1920px+)

## 🐛 Решение проблем

### Если yarn не устанавливается:
```bash
npm install -g yarn
```

### Если возникают ошибки TypeScript:
```bash
yarn add -D typescript @types/react @types/node
```

### Очистка кеша:
```bash
rm -rf .next
rm -rf node_modules
yarn install
```

## 📧 Контакты и поддержка

Если возникнут вопросы по проекту - пишите!

---

**Успехов с разработкой! 🎵🏝️**
