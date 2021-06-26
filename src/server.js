const express = require('express')
const app = express()
const port = 3000
const portscanner = require('portscanner')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/checkport/:port', (req, res) => {
    const port = req.params.port;
    portscanner.checkPortStatus(port, '127.0.0.1', function (error, status) {
        res.send(status);
    })

})

app.get('/findport/:sport/:eport', (req, res) => {
    const sport = req.params.sport;
    const eport = req.params.eport;
    portscanner.findAPortNotInUse(sport, eport, '127.0.0.1', function (error, port) {
        res.send('AVAILABLE PORT AT: ' + port)
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})