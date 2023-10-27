const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.get('/car-data', (req, res) => {
    console.log("Request for /car-data received from client " + req.ip)
    const dataCopy = JSON.parse(JSON.stringify(data)).forEach(car => varyCoords(car));
    res.send(dataCopy);
})
app.listen(port, () => {
  console.log(`Example app listening on port ${3000}`)
})

const varyCoords = (car) => {
    const lon = 10.4275;
    const lat = 55.439;
    const maxVar = .4;
    car.lat = lat + Math.random() * maxVar - maxVar / 2;
    car.lon = lon + Math.random() * maxVar - maxVar / 2;
}
const data = [
    {
        model: "Model S",
        manufacturer: "Tesla",
        year: 2022,
        weightKg: 2100.7,
        dkkPrKm: 0.35,
        dimensions: [4979, 1964, 1445],
        lat: 34.0522,
        lon: -118.2437,
        available: true,
        id: 1001
    },
    {
        model: "Ariya",
        manufacturer: "Nissan",
        year: 2023,
        weightKg: 1800.2,
        dkkPrKm: 0.28,
        dimensions: [4680, 1858, 1665],
        lat: 40.7128,
        lon: -74.0060,
        available: true,
        id: 1002
    },
    {
        model: "Bolt EUV",
        manufacturer: "Chevrolet",
        year: 2023,
        weightKg: 1750.5,
        dkkPrKm: 0.32,
        dimensions: [4166, 1766, 1614],
        lat: 37.7749,
        lon: -122.4194,
        available: false,
        id: 1003
    },
    {
        model: "Mustang Mach-E",
        manufacturer: "Ford",
        year: 2023,
        weightKg: 1980.3,
        dkkPrKm: 0.31,
        dimensions: [4748, 1881, 1600],
        lat: 34.0522,
        lon: -118.2437,
        available: true,
        id: 1004
    },
    {
        model: "ID.4",
        manufacturer: "Volkswagen",
        year: 2022,
        weightKg: 1850.6,
        dkkPrKm: 0.29,
        dimensions: [4584, 1852, 1640],
        lat: 40.7128,
        lon: -74.0060,
        available: true,
        id: 1005
    },
    {
        model: "i3",
        manufacturer: "BMW",
        year: 2022,
        weightKg: 1245.8,
        dkkPrKm: 0.24,
        dimensions: [3999, 1775, 1578],
        lat: 37.7749,
        lon: -122.4194,
        available: false,
        id: 1006
    },
    {
        model: "e-tron",
        manufacturer: "Audi",
        year: 2023,
        weightKg: 2300.4,
        dkkPrKm: 0.37,
        dimensions: [4901, 1935, 1616],
        lat: 34.0522,
        lon: -118.2437,
        available: true,
        id: 1007
    },
    {
        model: "Kona Electric",
        manufacturer: "Hyundai",
        year: 2023,
        weightKg: 1675.9,
        dkkPrKm: 0.26,
        dimensions: [4180, 1800, 1570],
        lat: 40.7128,
        lon: -74.0060,
        available: true,
        id: 1008
    },
      {
        model: "Soul EV",
        manufacturer: "Kia",
        year: 2023,
        weightKg: 1620.2,
        dkkPrKm: 0.27,
        dimensions: [4195, 1800, 1600],
        lat: 37.7749,
        lon: -122.4194,
        available: false,
        id: 1009
    },
    {
        model: "I-PACE",
        manufacturer: "Jaguar",
        year: 2022,
        weightKg: 2135.6,
        dkkPrKm: 0.36,
        dimensions: [4682, 2139, 1565],
        lat: 34.0522,
        lon: -118.2437,
        available: true,
        id: 1010
    }]