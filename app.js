const { response } = require('express');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req,res) =>{
  
  punkAPI 
    .getBeers()
    .then(beersFromApi => {
      console.log(beersFromApi[0].image_url);
      res.render('beers', {
      allBeers: beersFromApi
    });
    })  
   .catch(error => console.log(error));
})

app.get('/random-beer', (req,res) =>{
  punkAPI
    .getRandom()
    .then(randBeer => {
      res.render('random-beer', {
        image: randBeer[0].image_url,
        name: randBeer[0].name,
        description: randBeer[0].description,
        tagline: randBeer[0].tagline,
        foodPairing: randBeer[0].food_pairing,
        tips: randBeer[0].brewers_tips 
      })
      console.log(randBeer);
    })
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
