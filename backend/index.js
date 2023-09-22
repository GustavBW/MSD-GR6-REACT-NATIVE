const express = require('express')
const app = express()
const port = 3000

app.get('/car-data', (req, res) => {
  res.send(`
    [
        {
            "name": "BWV",
            "price": 1000000
        },
        {
            "name": "BMW",
            "price": 2000000
        },
        {
            "name": "Benz",
            "price": 3000000
        }
    ]
  `)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})