# MED YU MED

## Для запуска

## Отправка пуш уведомления всем пользователям

Нужно поменять значения **title** и **body** и вызвать эту команду в терминале, либо импортировать этот код в postman и вызвать его там (предпочтительный вариант) 

```
curl --location --request POST 'https://fcm.googleapis.com/fcm/send' \
--header 'Authorization: key=AAAABn3uWRo:APA91bFCIJZPQ36uUZUjy-izjpONqXVs2pZqzk1Bi5puAInklgfmwSzm3xfXqcn4oO3Qh5GX0BawaikroYL0PIY5KoMAaEWDWdF1K1JDy6SPniXcqJgelAyQqiqmgFOS0M362vetlRaH' \
--header 'Content-Type: application/json' \
--header 'usertoken: EC2542786366BE324A4945EFCB68681F' \
--data-raw '{
"to": "/topics/main",
"notification": {
"title": "Акция",
"body": "Запишись на новую акцию уже сегодня",
"sound": "default"
}
}'
```

Также можно рассылать уведомления всем пользователям через firebase.console.com со страницы проекта
#   m y . i o  
 #   m y . i o  
 #   m y . i o  
 