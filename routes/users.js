const router = require('express').Router();

const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = 'TOP_SECRET';
// router.use((req,res,next) =>{
//     if(req.method === 'POST'){
//         next();
//     }else{
//         res.send(401); //Unauthorized
//     }
    
//  });

// router.get('/', (req,res,next) => {
//     if(req.method ==='POST'){
//         if(!req.body.name) res.send(400);
//         if(!req.body.role) res.send (400);
//         next();
//     }
//   else{
//       next();
//   }
// });

router.get('/', (req,res) => {
    UserModel.find().then( response =>{
        res.send(response);
    })
});

// router.get('/',async (req,res) => {
//     const users = await UserModel
//     .find() //filter
//     .select("name stock")
//     .sort("stock") //-stock
//     .exec();
// });

router.get('/:id', (req,res) => {
    UserModel.find({_id: req.params.id}).then( response =>{
        res.status(201);
        res.send(response);
    })
});

router.get('/validate/:id', (req,res,next) => {
    UserModel.findOne({_id: req.params.id})
    .then( user =>{
       
        user.validateUser();
       
        return user.save()
        
       
    })
    .then(updatedUser => {
        res.send(updatedUser);
    })
    .catch(err => {
        next(err);
    })
});

router.post('/', (req,res) => {
    // let finalData;
    // req.on('data', (chunk) => {
    //     console.log("data");
    //     finalData += chunk;
    // });

    // req.on('end', () =>{
    //     console.log("stream ended");
    //     const dataPassed = JSON.parse(JSON.stringify(finalData));
    //     console.log(dataPassed);
    //     res.sendStatus(200);
    // })
   const user = new UserModel (req.body);
   
   user.save().then(user => {
       console.log(user);
       res.status(201).send(user);
   })
    
//    res.sendStatus(200);
});

router.post('/login', (req,res) => {
    UserModel.findOne({email : req.body.email})
        .then( async(user) => {
                const valid = await user?.isValidPassword(req.body.password);
                if(valid){
                    // const token = jwt.sign({...user._doc}, secret,{
                    //     expiresIn: "15s"
                    // });
                    // res.json({token});
                    res.sendStatus(200);
                }else{
                    
                    res.send("wrong");
                } 
        })
})

router.put('/:id', (req,res) => {
    UserModel.findOneAndUpdate({ _id: req.params.id},req.body,{new: true})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        })
})

router.put('/email/:email', (req,res) => {
    UserModel.findOneAndUpdate({ email: req.params.email},req.body,{new: true})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        })
})

router.delete('/:id', (req,res) => {
    UserModel.findOneAndDelete({ _id: req.params.id})
        .then(data => {
            res.status(200).send(data);
        })
})


module.exports = router;
