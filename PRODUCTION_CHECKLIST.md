# Production Checklist

Используйте этот checklist перед развёртыванием приложения в production.

## 1. Код и разработка 🔧

- [ ] Все branch'и merged в main
- [ ] Нет console.log() в production коде
- [ ] Нет commented-out кода
- [ ] TypeScript errors: `npm run type-check` ✅
- [ ] Code review пройден
- [ ] Git history чистая
- [ ] Dependencies обновлены: `npm update`
- [ ] Нет уязвимостей: `npm audit fix`

## 2. Тестирование 🧪

- [ ] Функциональное тестирование:
  - [ ] Логин/регистрация работает
  - [ ] Админ-панель функциональна
  - [ ] Менеджер-интерфейс работает
  - [ ] Табелирование работает
- [ ] Cross-browser тестирование:
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
- [ ] Mobile тестирование:
  - [ ] iPhone
  - [ ] Android
- [ ] Performance тестирование:
  - [ ] Load time < 3s
  - [ ] Lighthouse score > 90
  - [ ] No memory leaks

## 3. Безопасность 🔒

### Аутентификация
- [ ] Password requirements установлены
- [ ] Rate limiting для логина включен
- [ ] CORS правильно настроен
- [ ] CSRF protection включена
- [ ] Session timeout установлен

### База данных
- [ ] RLS политики включены на всех таблицах
- [ ] Backups настроены (Supabase)
- [ ] Нет default passwords
- [ ] Нет exposed API ключей
- [ ] SQL injection защита (параметризованные запросы)

### Переменные окружения
- [ ] Все secrets в .env.local (не в коде)
- [ ] .env.local в .gitignore
- [ ] Env vars в Vercel dashboard
- [ ] Sensitive data не в client-side коде

### HTTPS и сертификаты
- [ ] HTTPS включен
- [ ] SSL certificate валидный
- [ ] Redirect http → https

## 4. Суаbase подготовка 🗄️

### Таблицы
- [ ] Все таблицы созданы
- [ ] Все миграции выполнены
- [ ] Индексы созданы на часто используемых полях
- [ ] Foreign keys установлены
- [ ] Constraints работают

### RLS Policies
- [ ] RLS включена на всех таблицах
- [ ] Policies для admin
- [ ] Policies для manager
- [ ] Policies для employee
- [ ] Policies протестированы

### Backups
- [ ] Backups настроены
- [ ] Retention period установлен (минимум 7 дней)
- [ ] Тестирование restore процесса

### Connection limits
- [ ] Connection pool размер оптимален
- [ ] Нет утечек соединений

## 5. Vercel подготовка 🚀

### Проект
- [ ] Проект создан
- [ ] GitHub репозиторий подключен
- [ ] Production branch: main
- [ ] Auto-deployments включены

### Переменные окружения
- [ ] NEXT_PUBLIC_SUPABASE_URL добавлена
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY добавлена
- [ ] NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL обновлена (production URL)

### Настройки
- [ ] Root directory правильный
- [ ] Build command правильный
- [ ] Start command правильный
- [ ] Node version правильная (18+)

### Domain
- [ ] Custom domain добавлен
- [ ] DNS records настроены
- [ ] SSL сертификат активен

## 6. Performance ⚡

### Frontend
- [ ] Code splitting оптимизирован
- [ ] Lazy loading компонентов
- [ ] Image optimization
- [ ] CSS optimization
- [ ] JavaScript minification

### Backend
- [ ] Database queries оптимизированы
- [ ] N+1 query problem решён
- [ ] Кэширование настроено
- [ ] API response time < 500ms

### CDN
- [ ] Static assets на CDN
- [ ] Cache headers правильные
- [ ] Compression включена (gzip)

## 7. Мониторинг и логирование 📊

### Логирование
- [ ] Error logging настроено
- [ ] Access logs настроены
- [ ] Log retention period установлен
- [ ] Sensitve data не логируется

### Мониторинг
- [ ] Uptime monitoring (StatusPage)
- [ ] Error monitoring (Sentry/LogRocket)
- [ ] Performance monitoring (Vercel Analytics)
- [ ] Database monitoring (Supabase)

### Alerts
- [ ] 500 errors alert
- [ ] High latency alert
- [ ] High memory usage alert
- [ ] Downtime alert

## 8. Документация 📚

- [ ] README актуален
- [ ] API документация полная
- [ ] Deployment guide написан
- [ ] Troubleshooting guide написан
- [ ] Database schema документирован

## 9. Контроль доступа 👥

- [ ] Admin пользователи назначены
- [ ] Дефолтные пароли изменены
- [ ] Нет test пользователей
- [ ] User roles правильно настроены
- [ ] 2FA (если требуется)

## 10. Backup и recovery 💾

- [ ] Backup process тестирован
- [ ] Restore process документирован
- [ ] Recovery time objective (RTO) установлен
- [ ] Recovery point objective (RPO) установлен

## 11. Compliance и законность ⚖️

- [ ] Privacy Policy актуальна
- [ ] Terms of Service актуальны
- [ ] GDPR compliance (если применимо)
- [ ] Data retention policy документирована
- [ ] User consent for tracking получен

## 12. Финальные проверки ✅

### Перед deployment
```bash
# Проверьте всё скомпилировалось
npm run build

# Проверьте нет ошибок
npm run lint

# Проверьте нет уязвимостей
npm audit

# Проверьте тесты
npm test
```

### После deployment
- [ ] Приложение загружается
- [ ] Логин работает
- [ ] Админ-панель доступна
- [ ] API работает
- [ ] Database connected
- [ ] Логирование работает
- [ ] Мониторинг активен

## 13. Communication 📢

- [ ] Команда уведомлена о deployment
- [ ] Changelog обновлен
- [ ] Release notes написаны
- [ ] Пользователи уведомлены (если требуется)
- [ ] Support team готов

## 14. Rollback план 🔄

- [ ] Процесс rollback задокументирован
- [ ] Команда знает как откатить
- [ ] Backup готов
- [ ] Previous version доступна

## Таблица выполнения

| Категория | Статус | Дата | Примечание |
|-----------|--------|------|-----------|
| Код | ⏳ | | |
| Тестирование | ⏳ | | |
| Безопасность | ⏳ | | |
| Supabase | ⏳ | | |
| Vercel | ⏳ | | |
| Performance | ⏳ | | |
| Мониторинг | ⏳ | | |
| Документация | ⏳ | | |
| Контроль доступа | ⏳ | | |
| Backup | ⏳ | | |
| Compliance | ⏳ | | |
| Финальные проверки | ⏳ | | |
| Communication | ⏳ | | |
| Rollback план | ⏳ | | |

## Знаки:
- ✅ Выполнено
- ⏳ В процессе
- ❌ Не выполнено
- ⚠️ Требует внимания

## Notes / Комментарии

```
Добавьте любые замечания, проблемы или особенности deployment'а здесь.

Дата deployment'а: _______________
Развёртывал: _______________
Основной контакт: _______________
```

## Sign-off

- [ ] Разработчик подтвердил готовность
- [ ] Тестер подтвердил качество
- [ ] DevOps подтвердил инфраструктуру
- [ ] Менеджер одобрил deployment
- [ ] Дата deployment'а согласована

---

**Примечание:** Используйте этот checklist для каждого deployment'а в production. Сохраняйте копию для истории.

**Последний deployment:** _____________  
**Статус:** ✅ ГОТОВО / ⏳ В ПРОЦЕССЕ / ❌ ОШИБКА
