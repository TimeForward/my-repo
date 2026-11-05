# Мой первый репозиторий

Учебный проект на JavaScript и Playwright.

Здесь я тренируюсь работать с Git, запускать UI- и API-тесты и использовать Page Object Model.

В проекте есть:
- тест входа на Sauce Demo;
- E2E-тест оформления заказа на Sauce Demo;
- CRUD-тесты для Restful-booker;
- ручной запуск тестов через GitHub Actions.

## Запуск

```bash
npm install
npx playwright install chromium
npm run tests:all
npx playwright show-report
```

Можно запускать отдельно:

```bash
npm run tests:ui
npm run tests:api
```

Тесты используют публичные учебные сайты и требуют интернет-соединения.
