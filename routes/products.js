const router = require('express').Router();

const ProductModel = require('../models/product');
router.get('/', (req,res) => {
    ProductModel.find().then( response =>{
        res.send(response);
    })
});

router.get('/:id', (req,res) => {
    ProductModel.find({_id: req.params.id}).then( response =>{
        res.send(response);
    })
});

router.post('/', (req,res) => {
   const product = new ProductModel (req.body);
   
   product.save().then(product => {
       console.log(product);
       res.status(201).send(product);
   })
    
//    res.sendStatus(200);
});

router.put('/:id', (req,res) => {
    ProductModel.findOneAndUpdate({ _id: req.params.id},req.body,{new: true})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        })
})

router.delete('/:id', (req,res) => {
    ProductModel.findOneAndDelete({ _id: req.params.id})
        .then(data => {
            res.status(200).send(data);
        })
})

module.exports = router;