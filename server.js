// Here is where we import modules
// We begin by loading Express
require('dotenv').config();
require('./config/database');

const express = require('express');
const morgan = require('morgan');

const app = express();

//Models
const Fruit = require("./models/fruit.js");



// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));


// ROUTES


app.get("/", async (req, res) => {
    res.render("index.ejs");
    }
);

    // Get fruits/new
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
    }
);

//Get /fruits
app.get('/fruits', async (req,res) => {
    const allFruits = await Fruit.find();
    res.render( 'fruits/index.ejs' ,{ fruits: allFruits })
})

app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect('/fruits');
  }
);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

