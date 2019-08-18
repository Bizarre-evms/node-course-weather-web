const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Paths
const publiDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publiDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Yrimri'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yrimri'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'No help',
        name: 'Yrimri'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address is required.'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        errMessage: 'Help article not found.',
        name: 'Yrimri'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        errMessage: 'Page not found.',
        name: 'Yrimri'
    })
})

app.listen(port, () => {
    console.log('Server started on port ' + port)
})