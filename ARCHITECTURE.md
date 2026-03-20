# Архитектура приложения Staff Schedule & Timesheet

## Обзор системы

Приложение представляет собой интегрированную платформу для управления штатным расписанием, графиками сотрудников и их табелированием.

## Компоненты системы

### 1. Frontend (Next.js 16)

**Основные страницы:**

```
/app
├── auth/                    # Публичные страницы аутентификации
│   ├── login/              # Страница входа
│   ├── sign-up/            # Страница регистрации
│   └── callback/           # OAuth callback
├── dashboard/              # Защищённые админ-страницы
│   ├── facilities/         # Управление объектами
│   ├── positions/          # Управление должностями
│   ├── employees/          # Управление сотрудниками
│   ├── shift-templates/    # Управление шаблонами смен
│   └── schedules/          # Управление расписаниями
├── manager/                # Защищённые страницы менеджера
│   ├── /                   # Обзор графика
│   ├── timesheet/          # Табелирование
│   └── team/               # Управление командой
└── api/                    # API маршруты
    ├── auth/               # Аутентификация
    ├── facilities/         # API объектов
    ├── positions/          # API должностей
    ├── employees/          # API сотрудников
    ├── schedules/          # API расписаний
    └── timesheets/         # API табелирования
```

### 2. Backend (Supabase PostgreSQL)

**Таблицы и отношения:**

```sql
profiles
├── id (UUID, PK)
├── email (UNIQUE)
├── full_name
├── role (admin/manager/employee)
└── facility_id (FK → facilities)

facilities
├── id (UUID, PK)
├── name
├── address
├── description
└── created_by (FK → profiles)

positions
├── id (UUID, PK)
├── facility_id (FK → facilities)
├── name
├── description
├── hourly_rate
└── required_count

employees
├── id (UUID, PK)
├── profile_id (FK → profiles)
├── facility_id (FK → facilities)
├── position_id (FK → positions)
├── first_name
├── last_name
├── phone
├── email
├── hire_date
└── status (active/inactive)

shift_templates
├── id (UUID, PK)
├── facility_id (FK → facilities)
├── name
├── start_time
├── end_time
├── duration_hours
└── description

schedules
├── id (UUID, PK)
├── facility_id (FK → facilities)
├── employee_id (FK → employees)
├── position_id (FK → positions)
├── shift_template_id (FK → shift_templates)
├── scheduled_date
├── start_time
├── end_time
├── notes
└── created_by (FK → profiles)

timesheets
├── id (UUID, PK)
├── facility_id (FK → facilities)
├── employee_id (FK → employees)
├── schedule_id (FK → schedules)
├── check_in_time
├── check_out_time
├── notes
└── status (pending/approved/rejected)
```

### 3. Аутентификация и авторизация

**Supabase Auth:**
- Email/Password аутентификация
- JWT токены
- Session management
- Row Level Security (RLS)

**Роли пользователей:**
- `admin` - Полный доступ ко всему
- `manager` - Управление сотрудниками своего объекта
- `employee` - Просмотр своего расписания и табелей

### 4. Безопасность

**Row Level Security (RLS):**

```sql
-- Профили
- Users can view all profiles
- Users can update their own profile
- Admins can update any profile

-- Facilities
- Managers can view only their facility
- Admins can view all facilities

-- Employees
- Users can view employees of their facility
- Managers can update employees in their facility

-- Schedules
- Employees can view their own schedule
- Managers can manage schedules in their facility
- Admins can manage all schedules

-- Timesheets
- Employees can submit timesheets for their own schedule
- Managers can approve timesheets in their facility
- Admins can manage all timesheets
```

## Поток данных

### Создание расписания (Админ)

```
Admin Dashboard
    ↓
Select Facility → Select Employee → Select Shift Template → Create Schedule
    ↓
API POST /api/schedules
    ↓
Supabase Insert into schedules table
    ↓
RLS проверяет: user.role = 'admin'
    ↓
Schedule создан и вернён frontend
```

### Табелирование (Менеджер)

```
Manager Dashboard
    ↓
View Team Schedule
    ↓
Select Employee for Timesheet
    ↓
Mark Check-In/Check-Out
    ↓
API POST /api/timesheets
    ↓
Supabase Insert into timesheets table
    ↓
RLS проверяет: facility_id и manager role
    ↓
Timesheet создан и вернён frontend
```

## Компоненты и их взаимодействие

### UI Компоненты
```
Button, Input, Textarea, Select, Card, Table, Badge, Dialog
    ↓
Composed into Forms (FacilityForm, PositionForm, EmployeeForm)
    ↓
Used in Pages (Facilities, Positions, Employees)
    ↓
Navigation через Navigation Component
```

### Supabase Клиенты
```
lib/supabase/client.ts   → Browser client (CSR)
lib/supabase/server.ts   → Server client (SSR)
lib/supabase/middleware.ts → Session management
middleware.ts            → Route protection
```

## Масштабируемость

### Текущие ограничения
- PostgreSQL может обрабатывать миллионы записей
- Supabase автоматически масштабируется
- Next.js Edge Functions для API

### Оптимизация
- Индексы на часто используемых полях
- Кэширование на клиенте (SWR)
- Пагинация для больших наборов данных
- CDN для статических ассетов

## Резервное копирование и восстановление

**Supabase автоматически:**
- Создаёт ежедневные резервные копии
- Хранит их 7 дней
- Позволяет восстановиться за несколько кликов

## Мониторинг и логирование

**Доступные метрики:**
- Supabase Dashboard: API usage, database queries
- Vercel Analytics: Performance, deployments
- Browser console: Client-side errors

## Будущие улучшения

1. **Real-time updates** - использовать Supabase Realtime
2. **Email notifications** - отправка писем при изменениях
3. **SMS notifications** - оповещения через SMS
4. **Advanced reports** - статистика и аналитика
5. **Mobile app** - React Native приложение
6. **Integration** - API для внешних систем
