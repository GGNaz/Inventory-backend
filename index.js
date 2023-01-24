
const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const mongoose = require('mongoose');
const UserRouter = require('./routes/users');
const ProductRouter = require('./routes/products');
const CartRouter = require('./routes/cart');
const LogsRouter = require('./routes/logs');
const ChatRouter = require('./routes/chat');
const jwt = require('jsonwebtoken');
const secret = 'TOP_SECRET';

app.use(cors());

// app.use((req, res, next) => {
    
//     if(req.url==="/users/login"){
//         next();
//     }else{
//         const auth = req.headers.authorization;
//         jwt.verify(auth, secret, function(err, decoded) {
//             if(err){
//                 res.sendStatus(401);
//             }else{
//                 next();
//             }
//         });
//     }
    

// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



mongoose.connect('mongodb+srv://admin:admin@cluster0.tnogl.mongodb.net/taraDB?retryWrites=true&w=majority',{});
//CRUD             mongodb+srv://admin:<password>@cluster0.tnogl.mongodb.net/?retryWrites=true&w=majority
app.get( '/', (req,res) => {
    res.send("Welcome");
});

app.use('/cart', CartRouter);
app.use('/users', UserRouter);
app.use('/products', ProductRouter);
app.use('/logs', LogsRouter);
app.use('/chat', ChatRouter);

app.post( '/', (req,res) => {
    res.send("Post Request");
});

// app.put( '/', (req,res) => {
//     res.send("Update Request");
// });

// app.delete( '/', (req,res) => {
//     res.send("Delete Request");
// });



app.all("*",(req,res) =>{
    res.send("Routes not found!");
})

app.listen( port, () => {
    console.log(`server is running at port ${port}`);
})