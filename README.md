
curl -X POST http://localhost:3000/loans \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "João da Silva",
    "amount": 15000.50,
    "latitude": -23.5505,
    "longitude": -46.6333
  }'
