// Here is where we import modules
// We begin by loading Express
require('dotenv').config();
require('./config/database');

const express = require('express');
const morgan = require('morgan');
const methodOverride = require("method-override");

//Models
const Fruit = require("./models/fruit.js");

const app = express();


// MIDDLEWARE
app.use(methodOverride("_method"));
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

app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
  }
);

app.delete("/fruits/:fruitId", async (req, res) => {
    const fruitId = req.params.fruitId
    await Fruit.findByIdAndDelete (fruitId)
    res.redirect('/fruits')
    }
);

app.get("/fruits/:fruitId/edit", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/edit.ejs", {
      fruit: foundFruit,
    }
);
});

app.put("/fruits/:fruitId", async (req, res) => {
    // Handle the 'isReadyToEat' checkbox data
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    
    // Update the fruit in the database
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
  
    // Redirect to the fruit's show page to see the updates
    res.redirect(`/fruits/${req.params.fruitId}`);
  });
  
  

//Get /fruits
app.get('/fruits', async (req,res) => {
    const allFruits = await Fruit.find();
    res.render( 'fruits/index.ejs' ,{ fruits: allFruits })
    }
);

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
    }
);

