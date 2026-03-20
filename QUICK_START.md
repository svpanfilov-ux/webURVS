# Быстрый старт (5 минут)

## Шаг 1: Подготовка (1 минута)

```bash
# 1. Клонируйте репозиторий
git clone <repo-url>
cd webURVS

# 2. Установите зависимости
npm install
```

## Шаг 2: Создание Supabase проекта (2 минуты)

1. Откройте [supabase.com](https://supabase.com)
2. Нажмите "New project"
3. Заполните:
   - **Organization**: создайте или выберите существующую
   - **Project name**: `staff-schedule`
   - **Database password**: сохраните в безопасном месте
   - **Region**: выберите ближайший
4. Нажмите "Create new project"
5. Дождитесь инициализации (2-3 минуты)

## Шаг 3: Получение ключей (1 минута)

1. В Supabase Dashboard перейдите в **Settings**
2. Выберите **API**
3. Скопируйте:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` ключ → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Шаг 4: Настройка окружения (1 минута)

```bash
# 1. Создайте .env.local файл
cp .env.example .env.local

# 2. Отредактируйте .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

## Шаг 5: Инициализация БД (2 минуты)

1. В Supabase Dashboard откройте **SQL Editor**
2. Нажмите "New query"
3. Скопируйте содержимое `scripts/001_create_tables.sql`
4. Вставьте в редактор и нажмите "Run"
5. Повторите для `scripts/002_profile_trigger.sql`

## Шаг 6: Запуск приложения (30 секунд)

```bash
npm run dev
```

Приложение готово на **[http://localhost:3000](http://localhost:3000)**

## Первые шаги в приложении

### 1. Создание админ-аккаунта

1. Нажмите "Sign Up"
2. Введите email: `admin@example.com`
3. Введите пароль: `Admin123!`
4. Нажмите "Create account"
5. ✅ Готово! Вы админ

### 2. Создание объекта (Facility)

1. Перейдите в **Dashboard**
2. Нажмите **Объекты**
3. Нажмите "Создать объект"
4. Заполните:
   - Название: "Офис Москва"
   - Адрес: "ул. Примеров, 1"
   - Описание: "Главный офис"
5. Нажмите "Создать объект"

### 3. Создание должности (Position)

1. Перейдите в **Должности**
2. Нажмите "Создать должность"
3. Заполните:
   - Выберите объект: "Офис Москва"
   - Название: "Менеджер"
   - Часовая ставка: "500"
   - Требуемое количество: "5"
4. Нажмите "Создать должность"

### 4. Добавление сотрудника (Employee)

1. Перейдите в **Сотрудники**
2. Нажмите "Добавить сотрудника"
3. Заполните:
   - Имя: "Иван"
   - Фамилия: "Петров"
   - Должность: "Менеджер"
   - Email: "ivan@example.com"
4. Нажмите "Добавить"

### 5. Создание шаблона смены (Shift Template)

1. Перейдите в **Шаблоны смен**
2. Нажмите "Создать шаблон"
3. Заполните:
   - Название: "Смена 8-16"
   - Начало: 08:00
   - Окончание: 16:00
4. Система автоматически подсчитает 8 часов

### 6. Создание расписания (Schedule)

1. Перейдите в **Расписания**
2. Нажмите "Создать расписание"
3. Заполните:
   - Объект: "Офис Москва"
   - Сотрудник: "Иван Петров"
   - Дата: "2024-03-21"
   - Шаблон смены: "Смена 8-16"
4. Нажмите "Создать расписание"

## Создание менеджер-аккаунта

1. В Supabase Dashboard откройте **SQL Editor**
2. Выполните:
```sql
-- Создание менеджер-пользователя
INSERT INTO profiles (id, email, full_name, role)
SELECT 
  id,
  email,
  'Менеджер Объекта',
  'manager'
FROM auth.users
WHERE email = 'manager@example.com'
LIMIT 1;

-- Обновление если уже существует
UPDATE profiles 
SET role = 'manager'
WHERE email = 'manager@example.com';
```

3. В приложении создайте аккаунт с `manager@example.com`
4. Войдите в приложение
5. Менеджер будет видеть интерфейс управления командой

## Полезные ссылки

- 📚 [README.md](./README.md) - Полное описание
- 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md) - Архитектура
- 🚀 [DEPLOYMENT.md](./DEPLOYMENT.md) - Развёртывание
- ✨ [FEATURES.md](./FEATURES.md) - Все функции
- 📖 [Supabase Docs](https://supabase.com/docs)
- 🔗 [Next.js Docs](https://nextjs.org/docs)

## Решение проблем

### Ошибка: "Supabase URL is not defined"
```bash
# Проверьте .env.local
cat .env.local

# Убедитесь что есть эти переменные:
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Ошибка: "Table does not exist"
```bash
# Повторно выполните SQL миграции
# 1. SQL Editor в Supabase
# 2. scripts/001_create_tables.sql
# 3. scripts/002_profile_trigger.sql
```

### Приложение не загружается
```bash
# Очистите кэш и переустановите
rm -rf .next node_modules
npm install
npm run dev
```

## Что дальше?

1. 👥 Создайте больше сотрудников
2. 📅 Заполните расписание на месяц
3. 🎯 Пригласите менеджеров в систему
4. 📱 Тестируйте табелирование
5. 📊 Просмотрите статистику

## Контакты поддержки

- 🐛 Найдена ошибка? Создайте Issue на GitHub
- 💬 Вопросы? Проверьте документацию
- 📧 Email: support@example.com

---

**Поздравляем!** Ваше приложение готово к работе! 🎉
