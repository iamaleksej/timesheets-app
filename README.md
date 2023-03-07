Важно! При отправке запросов к YouTrack и erp.apptrix.ru может возникать ошибка CORS - используйте плагин для Chrome, либо прокси, либо полностью отключайте безопасность для Google Chrome. Вся информация есть в сети.

Можно запускать Chrome через Win+R, как:
chrome.exe --user-data-dir="C://chrome-dev-disabled-security" --disable-web-security --disable-site-isolation-trials

//////////////////////////////////////////////////////////////


Общая задача: фронт для биллинг-панели ERP-системы.

Аккаунт для erp.apptrix.ru: erp_user / 12qwaszx12qwaszx

Токен для YouTrack: perm:cm9vdA==.NDktNQ==.U9qYToWJGGM0yfVz5wjeYYas7FDvGL

токен отправляется в заголовках - Authorization: Bearer #TOKEN#

Базовый URL YouTrack: https://demo-apptrix.myjetbrains.com/youtrack/api/

Документация YouTrack: https://www.jetbrains.com/help/youtrack/devportal/api-fields-syntax.html#samples

Использовалось React Router, Redux Toolkit и др.

Важно! Токены, полученные с erp.apptrix.ru не используются в запросах к YouTrack! Общая механика - после авторизации в erp.apptrix.ru сохраняется токен в localStorage, на этом взаимодействие с erp.apptrix.ru закончено, далее, для запросов в YouTrack используется токен, который написан выше.


Задачи:

1. Авторизация. На сервере используется JWT-авторизация, которая при успешном логине возвращает access_token, resfresh_token - для хранения использовается localStorage. API авторизации - http://erp.apptrix.ru/api/token/ . Принимает username и password, в случае успеха возвращает токены. Предусмотрен middleware, который подставляет в каждый запрос заголовок - Authorization: Bearer #TOKEN#,  где #TOKEN# - полученный access_token при авторизации. (если юзер не авторизован, то заголовок не подставляется, соответственно). Также проверяется ответ сервера при КАЖДОМ запросе, и в случае 401 - обновляется access_token по refresh_token’у (метод в API - http://erp.apptrix.ru/api/token/refresh/ , принимает refresh_token). Если по этому методу приходит ошибка - чищу localstorage и отправляю на страницу авторизации.
2. Пользователи. На главной странице обращаемся к другому серверу, к API YouTrack'a, пример - https://www.jetbrains.com/help/youtrack/devportal/api-fields-syntax.html#samples Выводится таблица пользователей, с полями - ID, NAME, LOGIN, EMAIL. Пересмотр подробной карточки пользователя, при переходе в которую выводится все те же данные в произвольном формате + TYPE пользователя
3. Задачи. Выводится список задач в табличном формате, с возможностью фильтрации по проекту, документация - https://www.jetbrains.com/help/youtrack/devportal/api-query-syntax.html#samples. В таблице выводится ID, SUMMARY, PROJECT NAME. Также, добавлено поле поиска (отсылать запросы на сервер при наборе пользователем минимум 3-х символов). Пример описан по ссылке выше в разделе Request with Query Parameter
4. Timesheets. Вывод временных записей. Заправшиваем Work Item's по задаче (так в YouTrack называются временные записи). В таблице с задачами, у каждой задачи есть кнопка - Timesheet. При клике на нее, в отдельном роуте открывается таблица WorkItem'ов. https://www.jetbrains.com/help/youtrack/devportal/api-entity-IssueWorkItem.html - документация. В таблице выводится имя пользователя, и затраченное время в формате - 1 hour 10 minutes
///////////////////////////////////////
У каждой выведенной задачи нет данных, т.к. ID задач отличаются от ID задач в Timesheets
///////////////////////////////////////
5. Генерация PDF. Из таблицы Timesheets генерируется PDF с этой же таблицей. Используется react-pdf
