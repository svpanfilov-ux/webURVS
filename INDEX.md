# 📋 Индекс приложения Staff Schedule & Timesheet

Это полный индекс и навигация по приложению, которое объединило два проекта в одно мощное решение.

## 🚀 Начало с приложением

**Новичок?** Начните здесь:

1. **[QUICK_START.md](./QUICK_START.md)** - Запуск приложения за 5 минут
2. **[README.md](./README.md)** - Основная информация о проекте
3. **[FEATURES.md](./FEATURES.md)** - Полное описание функций

## 📚 Полная документация

### Для разработчиков

| Документ | Описание |
|----------|---------|
| [README.md](./README.md) | Основная информация и инструкции |
| [QUICK_START.md](./QUICK_START.md) | Быстрый старт (5 минут) |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Инструкции развёртывания |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Архитектура системы |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | Структура проекта |
| [FEATURES.md](./FEATURES.md) | Описание всех функций |
| [GITHUB.md](./GITHUB.md) | Работа с Git и GitHub |

### Для DevOps / инфраструктуры

| Документ | Описание |
|----------|---------|
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Развёртывание на Vercel |
| [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) | Pre-production checklist |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Архитектура и требования |

### Справочная информация

| Документ | Описание |
|----------|---------|
| [INTEGRATION_NOTES.md](./INTEGRATION_NOTES.md) | Заметки об объединении проектов |
| [SUMMARY.md](./SUMMARY.md) | Итоговый отчёт о проекте |

## 🗂️ Структура файлов

```
webURVS/
├── 📖 ДОКУМЕНТАЦИЯ
│   ├── INDEX.md                    # ← ВЫ ЗДЕСЬ
│   ├── README.md                   # Основная информация
│   ├── QUICK_START.md              # Быстрый старт (5 мин)
│   ├── DEPLOYMENT.md               # Развёртывание
│   ├── ARCHITECTURE.md             # Архитектура системы
│   ├── PROJECT_STRUCTURE.md        # Структура проекта
│   ├── FEATURES.md                 # Все функции
│   ├── GITHUB.md                   # Работа с Git
│   ├── INTEGRATION_NOTES.md        # Объединение проектов
│   ├── PRODUCTION_CHECKLIST.md     # Pre-production checklist
│   └── SUMMARY.md                  # Итоговый отчёт
│
├── 💻 КОД ПРИЛОЖЕНИЯ
│   ├── app/                        # Next.js приложение
│   ├── components/                 # React компоненты
│   ├── lib/                        # Утилиты и сервисы
│   ├── public/                     # Статические файлы
│   └── middleware.ts               # Next.js middleware
│
├── 🗄️ БАЗА ДАННЫХ
│   └── scripts/                    # SQL миграции
│       ├── 001_create_tables.sql
│       └── 002_profile_trigger.sql
│
└── ⚙️ КОНФИГУРАЦИЯ
    ├── package.json
    ├── tsconfig.json
    ├── next.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── middleware.ts
    └── .env.example
```

## 🎯 Основные функции

### Администратор 👨‍💼
- ✅ Управление объектами (филиалы)
- ✅ Управление должностями
- ✅ Управление сотрудниками
- ✅ Создание шаблонов смен
- ✅ Создание расписаний
- ✅ Просмотр статистики
- ✅ Управление ролями пользователей

### Менеджер объекта 👨‍🔧
- ✅ Просмотр расписания команды
- ✅ Табелирование (Check-In / Check-Out)
- ✅ Управление командой
- ✅ Просмотр статистики присутствия

### Сотрудник 👤
- ✅ Просмотр личного графика
- ✅ Просмотр своих табелей

Подробнее: **[FEATURES.md](./FEATURES.md)**

## 🚀 Быстрый старт

### 1️⃣ Установка (1 минута)
```bash
npm install
cp .env.example .env.local
```

### 2️⃣ Настройка Supabase (2 минуты)
- Создайте проект на supabase.com
- Скопируйте ключи в .env.local

### 3️⃣ Инициализация БД (2 минуты)
- Выполните SQL скрипты из `scripts/`

### 4️⃣ Запуск (30 секунд)
```bash
npm run dev
```

**Полные инструкции:** **[QUICK_START.md](./QUICK_START.md)**

## 📦 Технологический стек

- **Frontend:** Next.js 16, React 19, TypeScript
- **Стили:** Tailwind CSS 3.4
- **База данных:** Supabase (PostgreSQL)
- **Аутентификация:** Supabase Auth
- **Хостинг:** Vercel
- **UI:** Custom компоненты + Lucide React

## 🏗️ Архитектура

- **API-first подход** - все функции через REST API
- **Row Level Security (RLS)** - безопасность на уровне БД
- **Role-based access control** - управление доступом по ролям
- **Next.js Edge Functions** - высокая производительность

Подробнее: **[ARCHITECTURE.md](./ARCHITECTURE.md)**

## 🔐 Безопасность

- ✅ RLS политики на всех таблицах
- ✅ Supabase Auth с JWT
- ✅ HTTP-only cookies
- ✅ Параметризованные SQL запросы
- ✅ CORS и CSRF protection
- ✅ Input validation

## 📊 API Маршруты

```
POST   /api/auth/login
POST   /api/auth/sign-up
POST   /api/auth/logout
GET    /api/facilities
POST   /api/facilities
GET    /api/positions
POST   /api/positions
GET    /api/employees
POST   /api/employees
GET    /api/schedules
POST   /api/schedules
GET    /api/timesheets
POST   /api/timesheets
```

## 🗄️ Схема базы данных

```
profiles → facilities
            ├── positions
            ├── employees → timesheets, schedules
            ├── shift_templates
            └── schedules → timesheets
```

7 таблиц с полным RLS покрытием.

## 📝 Команды

```bash
# Development
npm run dev              # Запуск dev сервера
npm run build            # Build приложения
npm run start            # Запуск prod сервера
npm run lint             # Проверка кода
```

## 📍 Важные файлы

| Файл | Назначение |
|------|-----------|
| `app/layout.tsx` | Root layout |
| `middleware.ts` | Route protection |
| `lib/supabase/client.ts` | Browser client |
| `lib/supabase/server.ts` | Server client |
| `scripts/001_create_tables.sql` | Создание таблиц |
| `scripts/002_profile_trigger.sql` | Триггер профиля |

## 🔄 Объединение двух проектов

Это приложение объединило:
- **v0-staff-schedule-generator** (расписания и графики)
- **webURVS** (управление объектами и табелирование)

**Подробнее:** **[INTEGRATION_NOTES.md](./INTEGRATION_NOTES.md)**

## 🚀 Deployment

### На Vercel (рекомендуется)
1. Push репозиторий на GitHub
2. Подключите Vercel
3. Добавьте env vars
4. Auto-deploy!

### Локально / на другом сервере
```bash
npm run build
npm run start
```

**Полные инструкции:** **[DEPLOYMENT.md](./DEPLOYMENT.md)**

## ✅ Pre-Production

Перед развёртыванием в production используйте:
**[PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)**

## 📞 Поддержка и вопросы

### Часто задаваемые вопросы

**Q: Как создать админ-аккаунт?**  
A: Используйте Sign Up, затем измените роль в Supabase.

**Q: Как добавить менеджера?**  
A: Создайте пользователя и установите role = 'manager'

**Q: Где скачать SQL скрипты?**  
A: В папке `scripts/`

**Q: Как развернуть на Vercel?**  
A: Смотрите [DEPLOYMENT.md](./DEPLOYMENT.md)

### Контакты
- 🐛 Issues на GitHub
- 📧 Email поддержка

## 📚 Дополнительные ресурсы

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🎓 Примеры использования

### Создание расписания
1. Login как админ
2. Dashboard → Расписания
3. Выберите объект, сотрудника, дату
4. Назначьте смену

### Табелирование
1. Login как менеджер
2. Менеджер → Табелирование
3. Выберите сотрудника
4. Check-In / Check-Out

### Просмотр статистики
1. Менеджер → Команда
2. Видите статистику присутствия

## 🎯 Дорожная карта

### Текущее (v1.0)
- ✅ Управление объектами
- ✅ Управление должностями
- ✅ Управление сотрудниками
- ✅ Расписания и графики
- ✅ Табелирование

### Планируется
- 📋 Real-time обновления
- 📧 Email уведомления
- 📱 Mobile app
- 📊 Advanced reports
- 🔄 API интеграции

## 📈 Статистика проекта

- **Файлов кода:** ~25
- **Компонентов:** ~15
- **API маршрутов:** 8
- **SQL таблиц:** 7
- **Документация:** 10 файлов
- **Строк кода:** ~3000
- **Строк документации:** ~2000

## 🏆 Качество

- ✅ TypeScript strict mode
- ✅ SEO оптимизирован
- ✅ Mobile responsive
- ✅ Accessibility (WCAG)
- ✅ Performance optimized
- ✅ Security hardened

## 📋 Чеклист для новичков

- [ ] Прочитал [QUICK_START.md](./QUICK_START.md)
- [ ] Установил проект
- [ ] Создал Supabase проект
- [ ] Выполнил SQL миграции
- [ ] Запустил `npm run dev`
- [ ] Создал админ-аккаунт
- [ ] Создал объект
- [ ] Создал должность
- [ ] Добавил сотрудника
- [ ] Создал расписание

## 🎉 Готово к использованию!

Приложение полностью готово к запуску и development'у.

**Начните с:** **[QUICK_START.md](./QUICK_START.md)** ✨

---

**Последнее обновление:** 2024-03-21  
**Версия:** 1.0.0  
**Статус:** ✅ Production Ready
