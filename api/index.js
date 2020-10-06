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
        return res.status(400).send({message: 'No empty parameter allowed'})
    }
    height = height / 100
    let bmi = weight / (height * height)
    if(bmi){
        let category
        if(bmi <= 16){
            category = 'Severe Thinness'
        }
        else if(bmi <= 17){
            category = 'Moderate Thinness'
        }
        else if(bmi <= 18.5){
            category = 'Mild Thinness'
        }
        else if(bmi <= 25){
            category = 'Normal'
        }
        else if(bmi <= 30){
            category = 'Overweight'
        }
        else if(bmi < 35){
            category = 'Obese Class I'
        }
        else if(bmi < 40){
            category = 'Obese Class II'
        }
        else{
            category = 'Obese Class III'
        }
        return res.status(200).send({bmi: bmi, category: category})
    }
    else{
        return res.status(400).send({message: 'weight and height must be a number'})
    }
})

app.all('*', (req, res, next) => {
    res.status(403).send({message: 'Forbidden'})
})

app.listen(process.env.PORT || 8080, () => {
    console.log('Listening to port 5000')
})