const router = require('express').Router();

const ChatModel = require('../models/chat');
router.get('/', (req,res) => {
    ChatModel.find().then( response =>{
        res.send(response);
        console.log(response);
    })
});

router.get('/sort',async (req,res) => {
    // const users = await ChatModel
    await ChatModel.find().sort("created").exec()
    .then( response =>{
        res.send(response);
        console.log(response);
    })
});

router.get('/:id', (req,res) => {
    ChatModel.find({_id: req.params.id}).then( response =>{
        res.send(response);
    })
});

router.post('/', (req,res) => {
   const chatroom = new ChatModel (req.body);
   
   chatroom.save().then(chat => {
       console.log(chat);
       res.status(201).send(chat);
   })
    
//    res.sendStatus(200);
});

router.put('/:id', (req,res) => {
    ChatModel.findOneAndUpdate({ _id: req.params.id},req.body,{new: true})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        })
})


router.delete('/:id', (req,res) => {
    ChatModel.findOneAndDelete({ _id: req.params.id})
        .then(data => {
            res.status(200).send(data);
        })
})

router.delete('/', (req,res) => {
    ChatModel.deleteMany().then( response =>{
        res.send(response);
        console.log(response);
    })
})

module.exports = router;