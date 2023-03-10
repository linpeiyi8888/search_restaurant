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
app.get('/', (req, res) => {
    res.render('index', { restaurantsData })
})

app.get('/restaurants/:id', (req, res) => {
    const { id } = req.params // params型別為字串
    const restaurantInfo = restaurantsData.find(
            data => data.id === Number(id) // 將字串型別的id轉為數字型別
        )
    res.render('show', { restaurantInfo })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantsData.filter(
    data => 
      data.name.toLowerCase().includes(keyword) ||
      data.category.includes(keyword)

  )
  res.render('index', { restaurantsData: restaurants, keyword})
})


// Listen the server when it started
app.listen( port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})