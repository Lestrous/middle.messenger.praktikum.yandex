## Описание

Мессенджер для общения.
<br>
[Макет](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1)

Страницы сайта:
- [Авторизация](https://zippy-naiad-0e9543.netlify.app/)
- [Регистрация](https://zippy-naiad-0e9543.netlify.app/sign-up/)
- [Профиль](https://zippy-naiad-0e9543.netlify.app/settings/)
- [Чаты](https://zippy-naiad-0e9543.netlify.app/messenger/)
- [500](https://zippy-naiad-0e9543.netlify.app/500/)
- [404](https://zippy-naiad-0e9543.netlify.app/404/)

## Функциональность

- Регистрация, авторизация, выход из системы
- Формы проходят валидацию и отправляют данные на сервер, иначе показывают ошибки в форме
- Профиль: настройки профиля реализованы в модальном окне (изменять данные пользователя, изменять аватар, изменять пароль)
- Чаты: список чатов пользователя, создать новый чат, отправка сообщений, добавить пользователя в чат, удалить пользователя из чата
- Добавлены компоненты
- Добавлены классы запросов для HTTP и WebSocket

## Использованные инструменты

- TypeScript
- Handlebars
- Vite
- SCSS
- ESLint
- Prettier
- Stylelint
- Node.js

## Установка

- `npm install` — установка зависимостей,
- `npm run dev` — запуск версии для разработчика,
- `npm run build` — сборка стабильной версии,
- `npm run start` — сборка и запуск стабильной версии.
