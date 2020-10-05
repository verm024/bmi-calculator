// Muhammad Naufal Arkan Rafii
// 18/424193/PA/18298

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    res.send('Welcome to BMI Calculator API')
})

app.post('/calculate', (req, res, next) => {
    let height = Number(req.body.height)
    let weight = Number(req.body.weight)
    if(req.body.height == null || req.body.weight == null){
        return res.status(400).send({error: 'No empty parameter allowed'})
    }
    height = height / 100
    let bmi = weight / (height * height)
    if(bmi){
        return res.status(200).send({bmi: bmi})
    }
    else{
        return res.status(400).send({error: 'weight and height must be a number'})
    }
})

app.all('*', (req, res, next) => {
    res.status(403).send({error: 'Forbidden'})
})

app.listen(5000, () => {
    console.log('Listening to port 5000')
})