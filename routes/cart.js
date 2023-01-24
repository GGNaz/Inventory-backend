const router = require('express').Router();

const CartModel = require('../models/cart');
router.get('/', (req,res) => {
    CartModel.find().then( response =>{
        res.send(response);
        console.log(response);
    })
});

router.get('/:id', (req,res) => {
    CartModel.find({_id: req.params.id}).then( response =>{
        res.send(response);
    })
});

router.post('/', (req,res) => {
   const mycart = new CartModel (req.body);
   
   mycart.save().then(product => {
       console.log(product);
       res.status(201).send(product);
   })
    
//    res.sendStatus(200);
});

router.put('/:id', (req,res) => {
    CartModel.findOneAndUpdate({ _id: req.params.id},req.body,{new: true})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        })
})

router.delete('/:id', (req,res) => {
    CartModel.findOneAndDelete({ _id: req.params.id})
        .then(data => {
            res.status(200).send(data);
        })
})

router.delete('/', (req,res) => {
    CartModel.deleteMany().then( response =>{
        res.send(response);
        console.log(response);
    })
})

module.exports = router;