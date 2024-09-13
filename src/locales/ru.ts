import { MIN_PASSWORD_LENGTH } from '@/common/constants';

export default {
  'header.links.sign-in': 'Войти',
  'header.links.sign-up': 'Зарегистрироваться',
  'header.button.sign-out': 'Выйти',

  'main.welcome': 'Добро пожаловать, пожалуйста, войдите в систему.',
  'main.signed-in': 'С возвращением, {name}!',
  'main.title': 'REST/GraphQL клиент',
  'main.links.rest': 'REST клиент',
  'main.links.graphql': 'GraphQL клиент',
  'main.links.history': 'История',
  'main.links.sign-in': 'Войти',
  'main.links.sign-up': 'Зарегистрироваться',
  'main.project': 'Информация о проекте',
  'main.project-info':
    'Разработанный в качестве итогового задания на курсе React, этот проект демонстрирует скоординированные усилия трёх преданных участников.\nЗавершённое в течение четырёх недель, это приложение является результатом усердной работы и сотрудничества команды.\nПриложение поддерживает как RESTful, так и GraphQL API, включает аутентификацию через Firebase, отслеживание истории запросов и переключение языков.\nПользователи могут настраивать и отправлять запросы, просматривать ответы.',
  'main.team.name-1': 'Иван Жиребный',
  'main.team.role-1': 'Frontend-разработчик, Лидер команды',
  'main.team.contributions-1': 'Настройка среды разработки, Страницы аутентификации, Firebase, GraphQL',
  'main.team.bio-1':
    'Окончил Московский государственный технический университет имени Баумана, завершил профессию «Фронтенд-разработчик» в HTML Academy.',
  'main.team.name-2': 'Вадим Колымбет',
  'main.team.role-2': 'Frontend-разработчик',
  'main.team.contributions-2': 'Маршрутизация, Интернационализация, Тестирование',
  'main.team.bio-2':
    'Окончил Саратовский государственный университет, обучался на факультете Компьютерных Наук и Информационных Технологий, а также на кафедре Теоретических основ Компьютерной Безопасности и Криптографии. Завершил курсы по верстке от Frontendblok. Работал T-SQL разработчиком.',
  'main.team.name-3': 'Александра Боднар',
  'main.team.role-3': 'Frontend-разработчик, Scrum-мастер',
  'main.team.contributions-3': 'Дизайн, Jira, MUI, REST, Страница истории, Главная страница',
  'main.team.bio-3':
    'Окончила Балтийский федеральный университет имени Иммануила Канта, обучалась на факультете бизнес-информатики. Завершила курсы 3WC по специальности Frontend-разработчик. Разрабатывала функции на PHP для 1C CRM.',
  'main.rs-1':
    'RSSchool — это онлайн-образовательное сообщество, ориентированное на веб-разработку и программирование, предлагающее хорошо структурированные курсы как для начинающих, так и для опытных разработчиков.',
  'main.rs-2':
    'Известная своим высоким качеством образования, RSSchool предоставляет комплексную программу, охватывающую всё — от основ HTML, CSS и JavaScript до продвинутых технологий, таких как React и Node.js. Школа делает акцент на обучении через проекты, позволяя студентам создавать реальные проекты и развивать впечатляющие портфолио.',
  'main.rs-3':
    'RSSchool процветает благодаря активному сообществу волонтёров, включая опытных разработчиков и выпускников, которые наставляют и поддерживают новых учащихся.',

  'teamMember.role': 'Роль',
  'teamMember.contributions': 'Вклад',
  'teamMember.bio': 'Краткая биография',
  'teamMember.techStack': 'Стек технологий: ',

  'sign-in.loader': 'Входим...',
  'sign-in.title': 'Вход',
  'sign-in.email': 'Почта',
  'sign-in.password': 'Пароль',
  'sign-in.submit': 'Войти',

  'sign-up.loader': 'Регистрируем...',
  'sign-up.title': 'Регистрация',
  'sign-up.name': 'Имя',
  'sign-up.email': 'Почта',
  'sign-up.password.title': 'Пароль',
  'sign-up.password': 'Введите пароль',
  'sign-up.password.confirm': 'Подтвердите пароль',
  'sign-up.submit': 'Зарегистрироваться',

  'rest.title': 'REST клиент',
  'rest.endpoint': 'Эндпоинт URL',
  'rest.params': 'Параметры',
  'rest.headers': 'Заголовки',
  'rest.variables': 'Переменные',
  'rest.body.title': 'Тело: ',
  'rest.body': 'Тело',

  'restApi.errors.fetch': 'Не удалось получить ответ',
  'restApi.errors.endpoint': 'Эндпоинт не указан',
  'restApi.errors.body': 'Тело ответа содержит ошибки',
  'restApi.errors.unknown': 'Произошла неизвестная ошибка при выполнении запроса',
  'restApi.errors.status': 'Ошибка получения данных',

  method: 'Метод',

  'clientTable.hide': 'Скрыть',
  'clientTable.show': 'Показать',
  'clientTable.key': 'Ключ',
  'clientTable.value': 'Значение',
  'clientTable.row': '+ строка',
  'clientTable.delete': 'Удалить',

  'requestButton.send': 'Отправить Запрос',

  'response.title': 'Ответ',
  'response.status': 'Статус:',
  'response.body': 'Тело:',

  'graphql.errors.parse': 'Не удается разобрать тело запроса в URL',
  'graphql.schema.completed': 'Запрос выполнен, можете открыть схему',
  'graphql.request.completed': 'Запрос выполнен, проверьте поле ответа',
  'graphql.title': 'GraphQL клиент',
  'graphql.endpoint': 'Эндпоинт URL',
  'graphql.schema': 'Схема URL',
  'graphql.request': 'Запрос',
  'graphql.schema.request': 'Запрос схемы',
  'graphql.schema.hide': 'Скрыть схему',
  'graphql.schema.show': 'Показать схему',
  'graphql.params': 'Параметры',
  'graphql.query.title': 'Запрос данных: ',
  'graphql.query': 'Запрос данных',
  'graphql.headers': 'Заголовки',
  'graphql.variables.title': 'Переменные: ',
  'graphql.variables': 'Переменные',

  'schema.title': 'Документация по схеме:',

  'graphQlApi.response-errors.endpoint': 'Эндпоинт или запрос данных не указаны',
  'graphQlApi.response-errors.variables': 'Поле переменных не является валидным JSON',
  'graphQlApi.response-errors.data':
    'Неизвестная структура ответа: отсутствует поле "data". Проверьте эндпоинт и параметры запроса',
  'graphQlApi.response-errors.unknown': 'Произошла неизвестная ошибка при выполнении запроса',
  'graphQlApi.response-errors.status': 'Ошибка получения данных',

  'graphQlApi.schema-errors.endpoint': 'Эндпоинт схемы не указан',
  'graphQlApi.schema-errors.body': 'Тело ответа схемы содержит ошибки',
  'graphQlApi.schema-errors.data':
    'Неизвестная структура ответа: отсутствует поле "data" или "__schema". Проверьте эндпоинт и заголовки',
  'graphQlApi.schema-errors.fetch-status': 'Не удалось получить документацию схемы, код состояния: {status}',
  'graphQlApi.schema-errors.unknown': 'Произошла неизвестная ошибка при выполнении запроса документацию схемы',

  'history.title': 'История',
  'history.empty.title': 'Вы не выполняли никаких запросов.',
  'history.empty': 'Здесь пусто. Попробуйте: ',
  'history.links.rest': 'REST клиент',
  'history.links.graphql': 'GraphQL клиент',
  'history.subtitle': 'Запросы:',

  'error.title': 'Упс!',
  'error.text': 'Извините, произошла непредвиденная ошибка.',
  'error.desc': 'Сообщение об ошибке:',
  'error.recommendation': 'Пожалуйста, попробуйте обновить страницу.',
  'error.refresh': 'Обновить страницу',

  '404.message': 'Запрашиваемая вами страница не найдена.',
  '404.back': 'Предыдущая страница',
  '404.main': 'Главная страница',

  'auth.loading': 'Загружаем Firebase...',
  'auth.expired': 'Срок действия вашего токена истек, пожалуйста, войдите снова',
  'auth.redirect': 'Перенаправляем...',

  'firebase.sign-out.success': 'Вы вышли из системы. История запросов очищена!',
  'firebase.sign-in.success': 'Успешный вход с помощью {email}!',
  'firebase.sign-up.success': '{name} успешно зарегистрирован!',
  'firebase.errors.USER_DISABLED': 'Пользователь заблокирован',
  'firebase.errors.INVALID_LOGIN_CREDENTIALS': 'Неверные учетные данные',
  'firebase.errors.EMAIL_EXISTS': 'Почта уже используется',
  'firebase.errors.TOO_MANY_ATTEMPTS_TRY_LATER': 'Слишком много попыток входа',
  'firebase.errors.NETWORK_REQUEST_FAILED': 'Сетевой запрос не выполнен',

  'validation.email.required': 'Почта обязательна',
  'validation.email.format': 'Почта должна иметь допустимый формат',
  'validation.password.required': 'Пароль обязателен',
  'validation.password.number': 'Пароль должен содержать цифру',
  'validation.password.uppercase': 'Пароль должен содержать заглавную букву',
  'validation.password.lowercase': 'Пароль должен содержать строчную букву',
  'validation.password.special': 'Пароль должен содержать один из: -+/%*:#@\\$!?|^&',
  'validation.password.min': `Пароль должен быть не менее ${MIN_PASSWORD_LENGTH} символов`,
  'validation.name.required': 'Имя обязательно',
  'validation.name.capital': 'Имя должно начинаться с заглавной буквы',
  'validation.confirm.required': 'Пожалуйста, подтвердите свой пароль',
  'validation.confirm.match': 'Пароли не совпадают',
} as const;
