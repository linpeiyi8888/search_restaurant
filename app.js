// Include express from node_modules
const express = require('express')
const app = express()
const port = 3000

const restaurantsData = require('./restaurant.json').results

// Require express-handlebars here
const exphbs = require('express-handlebars')

// Setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Setting static file
app.use(express.static('public'))


// Setting the route and corresponding response
app.get('/',(req, res) => {
    res.render('index', { restaurantsData })
})


// Listen the server when it started
app.listen(port,()=>{
    console.log(`Express is running on http://localhost:${port}`)
})