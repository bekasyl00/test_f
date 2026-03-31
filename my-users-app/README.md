# 👥 Users App

SPA-приложение на **Vue 3 + TypeScript** для просмотра, поиска и фильтрации списка пользователей. Данные загружаются с публичного REST API [JSONPlaceholder](https://jsonplaceholder.typicode.com).

---

## 🚀 Быстрый старт

```bash
git clone <url>
cd my-users-app
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173/`

---

## 🛠 Стек технологий

| Технология | Версия | Назначение |
|---|---|---|
| **Vue 3** | ^3.4 | UI-фреймворк (Composition API, `<script setup>`) |
| **TypeScript** | ^5.3 | Статическая типизация |
| **Pinia** | ^2.1 | State management (официальная замена Vuex) |
| **Vue Router** | ^4.3 | Клиентская маршрутизация |
| **Axios** | ^1.6 | HTTP-клиент с interceptors |
| **Vite** | ^5.0 | Сборщик (HMR, ES modules) |

---

## ✅ Реализованный функционал

- **Загрузка данных** — 10 пользователей с REST API (`GET /users`)
- **Живой поиск** — по имени, email и username с debounce 350 мс
- **Фильтрация** — по городу или компании через выпадающий список
- **Комбинирование** — поиск и фильтр работают одновременно
- **Три состояния UI** — загрузка (спиннер), ошибка (с кнопкой retry), список
- **Счётчик результатов** — «Показано N из M»
- **Сброс фильтров** — одной кнопкой
- **Обработка ошибок** — таймаут, отсутствие сети, серверные ошибки (4xx, 5xx)

---

## 📁 Структура проекта

```
src/
├── types/          — интерфейсы TypeScript (User, FilterState)
├── services/       — HTTP-слой (Axios instance + interceptor)
├── stores/         — глобальное состояние (Pinia, Composition API)
├── composables/    — переиспользуемая логика (useSearch, useFilter)
├── components/     — UI-компоненты (SearchBar, FilterPanel, UserCard...)
├── views/          — страницы (UsersView — оркестратор)
├── router/         — маршрутизация
└── assets/         — глобальные стили
```

Каждый слой отвечает за своё: типы → получение данных → хранение → логика → отображение.

---

## 🏗 Архитектурные решения

### Pinia вместо Vuex
Pinia — официальный state manager для Vue 3. В отличие от Vuex: нет мутаций, Composition API стиль (`ref` + `computed`), полная поддержка TypeScript из коробки, меньше бойлерплейта.

### `filteredUsers` как computed в store
Вычисляемое свойство кешируется Vue: пересчёт происходит **только** при изменении `users`, `searchQuery` или `filter`. Компоненты не выполняют лишних вычислений — просто читают готовый результат.

### Debounce в composable
`useSearch.ts` инкапсулирует логику задержки. Компонент `SearchBar` работает с `localQuery` через `v-model` и не знает про таймеры. Логику можно переиспользовать или тестировать отдельно. Таймер чистится в `onUnmounted` для предотвращения утечек памяти.

### Axios interceptor
Все HTTP-ошибки (таймаут, отсутствие сети, 404, 5xx) обрабатываются в одном interceptor в `userService.ts`. Store получает только чистую строку с сообщением об ошибке — принцип единой ответственности.

### Composables для логики
`useSearch` и `useFilter` извлекают реактивную логику из компонентов. Компоненты остаются тонкими (только шаблон + привязка), логика изолирована и тестируема.

### Типизация
Все интерфейсы (`User`, `Address`, `Company`, `FilterState`) вынесены в `types/user.ts` и используются сквозь весь проект: в сервисе, store, composables и компонентах.

---

## 🔄 Поток данных

```
UsersView (onMounted)
  → store.fetchUsers()
    → userService.getAll()
      → GET jsonplaceholder.typicode.com/users
    → store.users = response

SearchBar (v-model)
  → useSearch().localQuery
    → debounce 350ms
      → store.setSearchQuery()
        → computed filteredUsers пересчитывается
          → UserList обновляется реактивно

FilterPanel (click / select)
  → useFilter().applyFilter()
    → store.setFilter()
      → computed filteredUsers пересчитывается
        → UserList обновляется реактивно
```

---

## 📈 Что можно улучшить

- **Пагинация / виртуальный скролл** — для работы с большими списками (100+ записей)
- **Skeleton-лоадер** — вместо спиннера для более плавного UX
- **Unit-тесты** — composables и store через Vitest
- **URL-синхронизация фильтров** — query params (`?search=Leanne&city=Gwenborough`) для шаринга ссылок
- **Тёмная тема** — через CSS custom properties и `prefers-color-scheme`
- **TanStack Query** — для кеширования ответов, авто-retry и stale-while-revalidate
- **Детальная страница** — `/users/:id` с полной информацией о пользователе
