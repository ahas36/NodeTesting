const express = require('express')
const app = express()
const port = 3000
var tcpPortUsed = require('tcp-port-used');

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/checkport/:port', (req, res) => {
    const port = Number.parseInt(req.params.port);
    findPort(port,(r)=>{
        res.send(''+r)
    });

})

app.get('/findport/:sport/:eport', (req, res) => {
    const sport = req.params.sport;
    const eport = req.params.eport;
    portscanner.findAPortNotInUse(sport, eport, '127.0.0.1', function (error, port) {
        res.send('AVAILABLE PORT AT: ' + port)
    })
})

const findPort = (port, callback) => {
    tcpPortUsed.check(port, '127.0.0.1').then(function (inUse) {
        if(inUse){
            findPort(port+1,callback);
        }else{
            callback(port);
        } 
    }, function (err) {
        callback(err.message);
    });
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})