# Ticket-selling platform

Run:
```
docker-compose up -d --build
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
