const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPhat = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and view location
app.set('view engine','hbs')
app.set('views', viewsPhat)
hbs.registerPartials(partialsPath)

//setup static directory to sereve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather-App',
        name: 'Jeka'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Jeka'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help page',
        name: 'Jeka',
        helpText: 'This is help text'
    })
})

app.get('/weather', (req, res) =>{
    
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({error})   
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({error}) 
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    res.send({
        products:{}
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title:'404 page',
        name:'Jeka',
        errorMsg:'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title:'404 page',
        name:'Jeka',
        errorMsg:'404 page not found'
    })
})


app.listen(3000,() => {
    console.log('server is up on port 3000.')
})

