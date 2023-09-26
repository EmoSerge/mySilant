<h1>Дипломный проект - Сервис Мой Силант </h1>

<h2>Ваше задание:</h2>

О заказчике и проекте
Ваш заказчик — Чебоксарский завод силовых агрегатов (ЧЗСА). Этот завод выпускает компоненты к дорожно-строительной технике. Например, охлаждающие системы для двигателей тракторов или детали ходовой части. В общем, ЧЗСА — это настоящее матёрое производство.

В 2021 году завод начал выпускать свои вилочные погрузчики. Бренд назвали «Силант». Для этого бренда вам и предстоит выполнять проект.

О сервисе, который нужно реализовать
Те, кто покупает погрузчики, должны их обслуживать. У всех деталей есть свой срок службы, и их важно вовремя менять. Если не заменить деталь вовремя, погрузчик может сломаться и предприятие, которое его использует, частично остановится и будет терять деньги.

При этом следить за заменой деталей — непростая задача. Их много, срок у них разный. Можно попросту забыть что-то поменять. Поэтому ЧЗСА решили помочь своим клиентам решить эту проблему.

Они решили разработать сервис, в котором можно было бы отслеживать состояние каждой купленной машины и всех её комплектующих. Так любой, кто купил погрузчик «Силант» может войти на сайт под своим профилем, и понять, каким машинам в скором времени нужно обслуживание.

Кроме того, сервис решили добавить возможность отслеживать, как идёт обслуживание техники. Так можно понять, когда очередной погрузчик выйдет из сервиса и вернётся в строй.

Требования к сервису
Сервис должен хранить следующие данные о складской технике «Силант»:

комплектация погрузчика;
место использования;
истории обслуживания, поломок и ремонта.
В сервисе должна быть реализована авторизация, в том числе различные роли: гость, клиент, сервисная организация и менеджер. У каждой роли должен быть настроен свой уровень доступа к просмотру и редактированию данных.

Кто будет пользоваться сервисом
Целевая аудитория сервиса — это все, кто имеют отношение к работе с погрузчиками. А именно:

эксплуатанты техники: те, кто покупают технику;
сервисные организации: те, кто её чинят;
представители производителя техники: те, кто производят технику, то есть сами ЧЗСА.
Для каждого типа пользователей нужно будет реализовать свои функции и свой интерфейс взаимодействия.


<h2>Запуск проекта</h2>

Примеры команд даны для Windows-системы.

1. Перейдите в терминале в директорию проекта. 
2. Клонируйте проект.
```bash
git clone https://github.com/EmoSerge/mySilant
```
3. Перейдите в папку backend и создайте и активируйте виртуальную среду.
```bash
cd backend
py -m venv venv
venv\scripts\activate
```
4. Установите требуемые библиотеки.
```bash
pip install -r requirements.txt
```
5. Создайте секретный ключ и вставьте его в файл backend\App\App\\.env в переменную SECRET_KEY
```bash
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```
6. Перейдтие в директорию App
```bash
cd App
```
7. Запустите сервер.
```bash
py manage.py runserver
```
8. Откройте второе окно терминала
9. Перейдите в директорию frontend
```bash
cd frontend
```
10. Установите требуемые зависимости
```bash
npm install
```
11. Запустите локальный web-сервер
```bash
npm start
```

<h2>Расположение API-документации</h2>

Вся документация расположена по адресам:

http://127.0.0.1:8000/redoc

http://127.0.0.1:8000/swagger

http://127.0.0.1:8000/swagger.json

<h2>Возможности приложения</h2>

Главная страница приложения расположена по адресу:

http://localhost:3000/

<h2>Логины</h2>

Логины и пароли для авторизации записаны в фалйле login.txt