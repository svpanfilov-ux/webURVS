# Развёртывание приложения

## Локальная разработка

### Предварительные требования
- Node.js 18+ или выше
- npm, yarn, pnpm или bun
- Аккаунт Supabase

### Шаги установки

1. **Клонируйте репозиторий**
```bash
git clone <repo-url>
cd webURVS
```

2. **Установите зависимости**
```bash
npm install
# или yarn install, pnpm install, bun install
```

3. **Создайте Supabase проект**
   - Перейдите на [supabase.com](https://supabase.com)
   - Создайте новый проект
   - Получите URL и ключ доступа

4. **Настройте переменные окружения**
```bash
cp .env.example .env.local
```

Отредактируйте `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

5. **Выполните миграции БД**
   - Откройте SQL Editor в Supabase Dashboard
   - Скопируйте содержимое файла `scripts/001_create_tables.sql`
   - Выполните SQL
   - Скопируйте содержимое файла `scripts/002_profile_trigger.sql`
   - Выполните SQL

6. **Запустите приложение**
```bash
npm run dev
```

Приложение будет доступно на [http://localhost:3000](http://localhost:3000)

## Развёртывание на Vercel

### Способ 1: Через GitHub (рекомендуется)

1. **Загрузите репозиторий на GitHub**
```bash
git remote add origin <github-repo-url>
git push -u origin main
```

2. **Откройте [vercel.com](https://vercel.com)**
   - Нажмите "New Project"
   - Выберите GitHub репозиторий

3. **Настройте переменные окружения в Vercel**
   - Перейдите в Project Settings → Environment Variables
   - Добавьте:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` (используйте ваш Vercel домен)

4. **Развёртывание**
   - Vercel автоматически развернёт приложение при push в main

### Способ 2: Через Vercel CLI

```bash
# Установите Vercel CLI
npm install -g vercel

# Войдите в Vercel
vercel login

# Развёртывание
vercel
```

## Важные настройки Supabase

### Row Level Security (RLS)

Все таблицы защищены RLS политиками. Убедитесь, что:
- Пользователи могут только видеть и редактировать свои данные
- Администраторы имеют полный доступ

### Аутентификация

1. **Откройте Supabase Dashboard**
2. **Перейдите в Authentication → Providers**
3. **Настройте Email Provider** (обычно уже включён)
4. **Для Production:**
   - Добавьте SMTP настройки
   - Настройте домен для писем

## Проверка развёртывания

```bash
# Проверьте, что приложение запускается
npm run build
npm run start

# Проверьте переменные окружения
echo $NEXT_PUBLIC_SUPABASE_URL
```

## Решение проблем

### Ошибка "Supabase URL is not defined"
- Убедитесь, что `.env.local` содержит `NEXT_PUBLIC_SUPABASE_URL`
- Перезагрузите приложение

### Ошибка аутентификации
- Проверьте правильность `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Убедитесь, что redirect URL совпадает с URL в .env

### Ошибки таблиц БД
- Убедитесь, что выполнены миграции
- Проверьте RLS политики в Supabase Dashboard

## Резервная копия БД

```bash
# Используя Supabase CLI
supabase db pull

# Или через Dashboard
# Settings → Backups → Download
```

## Обновление приложения

После развёртывания на Vercel обновления произойдут автоматически:

1. Сделайте изменения в коде
2. Выполните `git push` в main
3. Vercel автоматически перестроит и развернёт приложение

## Масштабирование

- **Supabase** автоматически масштабируется в зависимости от нагрузки
- **Vercel** предоставляет автоматическое масштабирование
- Для большого количества пользователей рассмотрите Pro план
