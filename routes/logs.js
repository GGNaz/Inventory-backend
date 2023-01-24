const router = require('express').Router();

const LogsModel = require('../models/logs');
router.get('/', (req,res) => {
    LogsModel.find().then( response =>{
        res.send(response);
        console.log(response);
    })
});

router.get('/:id', (req,res) => {
    LogsModel.find({_id: req.params.id}).then( response =>{
        res.send(response);
    })
});

router.post('/', (req,res) => {
   const logs = new LogsModel (req.body);
   
   logs.save().then(log => {
       console.log(log);
       res.status(201).send(log);
   })
    
//    res.sendStatus(200);
});

router.put('/:id', (req,res) => {
    LogsModel.findOneAndUpdate({ _id: req.params.id},req.body,{new: true})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        })
})

router.delete('/:id', (req,res) => {
    LogsModel.findOneAndDelete({ _id: req.params.id})
        .then(data => {
            res.status(200).send(data);
        })
})

router.delete('/', (req,res) => {
    LogsModel.deleteMany().then( response =>{
        res.send(response);
        console.log(response);
    })
})

module.exports = router;