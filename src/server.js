const express = require('express')

const app = express()

const hostname = 'localhost'
const port = 8080

app.get('/',function(req, res){
    res.send('<h1>hello world </h1>')
})

app.listen(port, hostname, () => {
    console.log('test API' )
})