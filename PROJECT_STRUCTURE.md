# Структура проекта

## Полная структура каталогов и файлов

```
webURVS/
├── app/                              # Next.js приложение (App Router)
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx             # Страница входа
│   │   ├── sign-up/
│   │   │   └── page.tsx             # Страница регистрации
│   │   ├── callback/
│   │   │   └── page.tsx             # OAuth callback
│   │   └── error/
│   │       └── page.tsx             # Страница ошибки аутентификации
│   ├── api/                         # API маршруты
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts         # API логина
│   │   │   ├── sign-up/
│   │   │   │   └── route.ts         # API регистрации
│   │   │   └── logout/
│   │   │       └── route.ts         # API логаута
│   │   ├── facilities/
│   │   │   └── route.ts             # CRUD объектов
│   │   ├── positions/
│   │   │   └── route.ts             # CRUD должностей
│   │   ├── employees/
│   │   │   └── route.ts             # CRUD сотрудников
│   │   ├── schedules/
│   │   │   └── route.ts             # CRUD расписаний
│   │   └── timesheets/
│   │       └── route.ts             # CRUD табелей
│   ├── dashboard/                   # Админ-панель (защищена)
│   │   ├── layout.tsx               # Общий layout с навигацией
│   │   ├── page.tsx                 # Главная админ-страница
│   │   ├── facilities/
│   │   │   └── page.tsx             # Управление объектами
│   │   ├── positions/
│   │   │   └── page.tsx             # Управление должностями
│   │   ├── employees/
│   │   │   └── page.tsx             # Управление сотрудниками
│   │   ├── shift-templates/
│   │   │   └── page.tsx             # Управление шаблонами смен
│   │   └── schedules/
│   │       └── page.tsx             # Управление расписаниями
│   ├── manager/                     # Интерфейс менеджера (защищён)
│   │   ├── layout.tsx               # Layout с навигацией менеджера
│   │   ├── page.tsx                 # Обзор графика
│   │   ├── timesheet/
│   │   │   └── page.tsx             # Табелирование
│   │   └── team/
│   │       └── page.tsx             # Управление командой
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Главная страница
│   └── globals.css                  # Глобальные стили
│
├── components/                      # React компоненты
│   ├── facility-form.tsx            # Форма создания объекта
│   ├── navigation.tsx               # Компонент навигации
│   ├── loading.tsx                  # Компонент загрузки
│   └── ui/                          # UI компоненты (shadcn style)
│       ├── button.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       ├── card.tsx
│       ├── table.tsx
│       ├── badge.tsx
│       ├── select.tsx
│       ├── dialog.tsx
│       └── use-toast.ts
│
├── lib/                             # Утилиты и библиотеки
│   ├── supabase/
│   │   ├── client.ts                # Supabase browser client
│   │   ├── server.ts                # Supabase server client
│   │   └── middleware.ts            # Supabase session middleware
│   ├── types.ts                     # TypeScript типы
│   └── utils.ts                     # Утилиты (cn, etc)
│
├── scripts/                         # SQL миграции и скрипты
│   ├── 001_create_tables.sql       # Создание всех таблиц
│   └── 002_profile_trigger.sql     # Триггер для создания профиля
│
├── public/                          # Статические файлы
│   ├── favicon.ico
│   └── ...
│
├── .env.example                     # Пример переменных окружения
├── .env.local                       # Локальные переменные (gitignored)
├── .gitignore                       # Git ignore файл
├── middleware.ts                    # Next.js middleware
├── next.config.js                   # Next.js конфигурация
├── tailwind.config.js               # Tailwind CSS конфигурация
├── tsconfig.json                    # TypeScript конфигурация
├── postcss.config.js                # PostCSS конфигурация
├── package.json                     # Dependencies
├── package-lock.json                # Lock файл npm
│
├── README.md                        # Основная документация
├── QUICK_START.md                  # Быстрый старт (5 минут)
├── DEPLOYMENT.md                   # Инструкции развёртывания
├── ARCHITECTURE.md                 # Архитектура системы
├── FEATURES.md                     # Описание функций
└── PROJECT_STRUCTURE.md            # Этот файл

```

## Описание ключевых файлов

### Конфигурационные файлы

| Файл | Описание |
|------|---------|
| `package.json` | Зависимости проекта и скрипты |
| `tsconfig.json` | Конфигурация TypeScript |
| `next.config.js` | Конфигурация Next.js |
| `tailwind.config.js` | Конфигурация Tailwind CSS |
| `tailwind.config.js` | Конфигурация PostCSS |
| `middleware.ts` | Next.js middleware для route protection |
| `.env.example` | Шаблон переменных окружения |
| `.gitignore` | Игнорируемые файлы для Git |

### Основные компоненты приложения

**Supabase интеграция:**
- `lib/supabase/client.ts` - Browser client для CSR
- `lib/supabase/server.ts` - Server client для SSR
- `lib/supabase/middleware.ts` - Управление сессией

**Страницы приложения:**
- `app/page.tsx` - Главная страница
- `app/auth/login/page.tsx` - Логин
- `app/auth/sign-up/page.tsx` - Регистрация
- `app/dashboard/` - Админ-панель
- `app/manager/` - Интерфейс менеджера

**API маршруты:**
- `app/api/auth/*` - Аутентификация
- `app/api/facilities/*` - Управление объектами
- `app/api/positions/*` - Управление должностями
- `app/api/employees/*` - Управление сотрудниками
- `app/api/schedules/*` - Управление расписаниями
- `app/api/timesheets/*` - Управление табелями

**UI компоненты:**
- `components/ui/button.tsx` - Кнопка
- `components/ui/input.tsx` - Input поле
- `components/ui/card.tsx` - Карточка
- `components/ui/table.tsx` - Таблица
- `components/ui/dialog.tsx` - Диалог
- И другие...

### Базы данных (Supabase)

**Таблицы:**
- `profiles` - Профили пользователей
- `facilities` - Объекты (филиалы)
- `positions` - Должности
- `employees` - Сотрудники
- `shift_templates` - Шаблоны смен
- `schedules` - Расписания
- `timesheets` - Табелирование

## Зависимости проекта

### Runtime Dependencies
```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "next": "^16.0.0",
  "@supabase/ssr": "^0.4.0",
  "@supabase/supabase-js": "^2.40.0",
  "tailwindcss": "^3.4.0",
  "clsx": "^2.0.0",
  "lucide-react": "^0.408.0",
  "date-fns": "^3.0.0",
  "recharts": "^2.10.0",
  "zod": "^3.24.0"
}
```

### DevDependencies
```json
{
  "typescript": "^5.0.0",
  "@types/node": "^20.0.0",
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0"
}
```

## Переменные окружения

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

## Команды запуска

```bash
# Development
npm run dev              # Запуск dev сервера

# Production
npm run build            # Build приложения
npm run start            # Запуск prod сервера

# Linting
npm run lint             # Проверка кода
```

## Маршруты приложения

### Публичные маршруты
- `/` - Главная страница
- `/auth/login` - Страница входа
- `/auth/sign-up` - Страница регистрации
- `/auth/callback` - OAuth callback

### Защищённые маршруты (требуют аутентификации)
- `/dashboard/*` - Админ-панель (только для админов)
- `/manager/*` - Интерфейс менеджера (для менеджеров и выше)

## Интеграции и сервисы

- **Supabase** - База данных и аутентификация
- **Next.js** - Framework
- **Tailwind CSS** - Стили
- **Vercel** - Хостинг и deployment

## Стандарты кодирования

- **Язык**: TypeScript (строгий mode)
- **Framework**: React + Next.js
- **Стили**: Tailwind CSS
- **Компоненты**: Функциональные компоненты с hooks
- **Именование**: camelCase для переменных, PascalCase для компонентов
- **Файлы**: kebab-case для имён файлов

## Рекомендации для разработки

1. **Используйте TypeScript** - определяйте типы для всех функций
2. **Следуйте структуре** - добавляйте новые страницы в соответствующие папки
3. **Защищайте маршруты** - добавляйте проверку аутентификации
4. **Документируйте** - добавляйте комментарии для сложного кода
5. **Тестируйте** - проверяйте функциональность перед push
