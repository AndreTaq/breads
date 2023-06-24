const express = require("express");
const breads = express.Router();
const Bread = require("../models/bread.js");
const Baker = require('../models/baker.js')

// Index:
breads.get('/', async (req, res) => {
  const foundBakers = await Baker.find().lean()
  const foundBreads = await Bread.find().limit(2).lean()
  res.render('index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page'
  })
})

// in the new route
breads.get('/new', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            res.render('new', {
                bakers: foundBakers
            })
      })
})

// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
        Bread.findById(req.params.id)
          .then(foundBread => {
            res.render('edit', {
                bread: foundBread, 
                bakers: foundBakers 
            })
          })
    })
})

//SHOW
breads.get("/:id", (req, res) => {
  Bread.findById(req.params.id)
  .populate('baker')
  .then(foundBread => {
    const bakedBy = foundBread.getBakedBy()
    console.log(bakedBy)
    res.render('show', {
      bread: foundBread
    })
  })
  .catch(err => {
    res.send('<h1> This is not a page you should be on</h1>')
  })
});

// UPDATE put
breads.put('/:id',
  express.urlencoded({ extended: true }),
  (req, res) => {
    if (req.body.hasGluten === "on") {
      req.body.hasGluten = true;
    } else {
      req.body.hasGluten = false;
    }
    // Bread[req.params.arrayIndex] = req.body;
    Bread.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updateBread => {
      console.log(updateBread)
      res.redirect(`/breads/${req.params.id}`)
    })
  }
);

// DELETE
breads.delete("/:id", (req, res) => {
  Bread.findByIdAndDelete(req.params.id)
  .then(deletedBread => {
  res.status(303).redirect("/breads");
  })
});

//CREATE
breads.post("/", express.urlencoded({ extended: true }), (req, res) => {
  // console.log(req.body)
  console.log("undefined")
  if (!req.body.image) {
    req.body.image = 'undefined'
  }
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = "true";
  } else {
    req.body.hasGluten = "false";
  }
  Bread.create(req.body);
  res.redirect("/breads");
});

module.exports = breads;
