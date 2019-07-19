# Ticket-selling platform

Run:
```
docker-compose up -d --build
```
then login to container:
```
docker-compose exec tickets-api /bin/bash
```
and then run migrations to have schema and some initial data:
```
./node_modules/.bin/typeorm migration:run
```

Aplication will be available at:
```
http://localhost:8081
```

Available routes:

```
GET events/1 // informations about event
```
```
GET events/1/tickets // informations about available tickets for event 
```
```
POST events/1/tickets // reserving tickets

body: { "quantity": 2 }
```
```
GET reserervations/XXX // informations about reservation
```
```
POST reserervations/XXX //buying tickets

body: { "token": "OK" }
```
