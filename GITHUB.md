# Работа с GitHub репозиторием

## Начало работы

### 1. Клонирование репозитория

```bash
# Клонируйте репозиторий webURVS
git clone https://github.com/svpanfilov-ux/webURVS.git
cd webURVS

# Или если у вас уже есть локальная копия
cd /vercel/share/v0-project
```

### 2. Первый раз после клонирования

```bash
# Установите зависимости
npm install

# Создайте ветку для работы
git checkout -b staff-schedule-app
```

## Ветвление (Branching)

### Основные ветки

```
main (production)
├── Стабильная версия
├── Защищена (требуется код ревью)
└── Автоматический deployment на Vercel

staff-schedule-app (development)
├── Текущее развитие
├── Объединённое приложение
└── Может быть нестабильной
```

### Создание новой ветки

```bash
# Для новой функции
git checkout -b feature/timesheet-approval
git checkout -b feature/real-time-updates

# Для исправления ошибки
git checkout -b fix/rls-policy-issue
git checkout -b fix/auth-redirect

# Для документации
git checkout -b docs/deployment-guide
```

## Работа с кодом

### Перед началом работы

```bash
# Обновитесь с remote
git fetch origin
git pull origin staff-schedule-app

# Создайте ветку от актуальной версии
git checkout -b feature/your-feature origin/staff-schedule-app
```

### Во время работы

```bash
# Проверьте статус
git status

# Добавьте изменения
git add .
# Или конкретные файлы
git add app/page.tsx components/button.tsx

# Коммитьте логические группы изменений
git commit -m "feat: add timesheet approval workflow"
git commit -m "fix: correct RLS policy for timesheets"
git commit -m "docs: update deployment instructions"
```

## Commit сообщения

### Форматирование

Используйте Conventional Commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Типы commits

- `feat:` - Новая функция
- `fix:` - Исправление ошибки
- `docs:` - Документация
- `style:` - Форматирование (не меняет функциональность)
- `refactor:` - Переработка кода
- `perf:` - Оптимизация производительности
- `test:` - Добавление тестов
- `chore:` - Обновление зависимостей

### Примеры

```bash
# Новая функция
git commit -m "feat(timesheet): add approval workflow for timesheets"

# Исправление
git commit -m "fix(auth): redirect to dashboard after login"

# Документация
git commit -m "docs(deployment): add Vercel deployment guide"

# Обновление зависимостей
git commit -m "chore(deps): update supabase-js to v2.40.0"
```

## Push и Pull Request

### Загрузка ветки

```bash
# Первый раз (создаст upstream ветку)
git push -u origin feature/your-feature

# В следующие разы
git push origin feature/your-feature
```

### Создание Pull Request

1. Перейдите на GitHub
2. Выберите вашу ветку
3. Нажмите "New Pull Request"
4. Заполните:
   - **Title**: Краткое описание
   - **Description**: 
     - Что изменилось
     - Почему это было нужно
     - Как тестировать
5. Нажмите "Create Pull Request"

### PR Template

```markdown
## Description
Краткое описание изменений

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update

## Testing
Как протестировать эти изменения:
1. ...
2. ...

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review of own code
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
```

## Обновление с main

Если main обновился, а вы работаете в другой ветке:

```bash
# Способ 1: Rebase (рекомендуется)
git fetch origin
git rebase origin/main

# Если конфликты
git status  # Посмотрите конфликты
# Решите конфликты в редакторе
git add .
git rebase --continue

# Способ 2: Merge
git fetch origin
git merge origin/main
```

## Решение конфликтов

```bash
# Посмотрите конфликтующие файлы
git status

# Откройте файл и решите конфликты
# Конфликты выглядят так:
# <<<<<<< HEAD
# Ваши изменения
# =======
# Изменения из другой ветки
# >>>>>>> branch-name

# После решения
git add .
git commit -m "fix: resolve merge conflicts"
```

## Синхронизация fork (если используете fork)

```bash
# Добавьте upstream
git remote add upstream https://github.com/svpanfilov-ux/webURVS.git

# Обновитесь с upstream
git fetch upstream
git rebase upstream/main

# Загрузите в ваш fork
git push origin main
```

## Code Review

### Перед PR-ом

Убедитесь что:
- ✅ Код следует style guide
- ✅ Нет console.log остатков
- ✅ Нет commented-out кода
- ✅ TypeScript errors исправлены
- ✅ Тесты проходят
- ✅ Документация обновлена

### Во время review

- 📝 Ответьте на комментарии
- 🔄 Сделайте просрочить изменения
- ✅ Отметьте как resolved

### После approval

```bash
# Если reviewer попросил изменения
git add .
git commit -m "style: address code review feedback"
git push origin feature/your-feature

# После approval, merge в ветку
git checkout main
git pull origin main
git merge feature/your-feature
git push origin main
```

## Удаление ветки

```bash
# Локально
git branch -d feature/your-feature

# На remote
git push origin --delete feature/your-feature
```

## История и логи

```bash
# Посмотрите историю
git log

# Красивый вывод
git log --oneline --graph --all

# История конкретного файла
git log -p app/page.tsx

# Кто изменил строку
git blame lib/supabase/client.ts

# Diff между ветками
git diff main..staff-schedule-app
```

## Helpful Git алиасы

Добавьте в `.gitconfig`:

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --oneline --graph --all'
```

Теперь можете использовать:
```bash
git co -b feature/new-feature
git ci -m "feat: add feature"
git visual
```

## GitHub Actions (CI/CD)

### Автоматический workflow

При push в main:
1. ✅ Lint проверка
2. ✅ Build
3. ✅ Deploy на Vercel

### Просмотр статуса

```bash
# В репозитории нажмите Actions
# Смотрите статус последних workflows
```

## Защита main ветки

Settings → Branches → Branch protection rules:

- ✅ Require pull request reviews
- ✅ Require status checks to pass
- ✅ Include administrators
- ✅ Restrict who can push

## Issues и Discussion

### Создание Issue

1. Нажмите Issues
2. New Issue
3. Заполните:
   - Title
   - Description
   - Labels (bug, enhancement, etc)
   - Assignee (кто работает)

### Использование в commits

```bash
# Связать commit с Issue
git commit -m "fix: resolve broken auth #42"
# Это автоматически свяжет commit и issue

# Закрыть Issue через commit
git commit -m "fix: resolve auth problem

Closes #42"
```

## Best Practices

1. **Small commits** - маленькие логические группы
2. **Meaningful messages** - понятные commit сообщения
3. **Frequent pushes** - часто загружайте в remote
4. **Code review** - просите review перед merge
5. **Tests** - пишите тесты
6. **Documentation** - документируйте сложный код
7. **No force push** - не используйте -f без причины

## Troubleshooting

### Отменить последний commit (не загруженный)
```bash
git reset --soft HEAD~1
```

### Отменить загруженный commit
```bash
git revert HEAD
```

### Восстановить удалённую ветку
```bash
git reflog
git checkout -b branch-name commit-hash
```

### Очистить локальные ветки
```bash
git branch -d ветка1 ветка2
# или удалить merged ветки
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d
```

## Полезные ссылки

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com)
- [Conventional Commits](https://www.conventionalcommits.org)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)

---

**Спасибо за вклад в проект!** 🙏
