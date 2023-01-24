const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    name: {
        type: String
       
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String
       
    },
    address: {
        type: String
      
    },
    orders: {
        type: Number
       
    },
    isUserLog: {
        type: Boolean,
        default: false
    },
    created : {
        type: Date,
        default: Date.now
    },
    userType: {
        type: String ,
        enum: ['Buyer', 'Rider']
    },
    // validated : {
    //     type: Boolean,
    //     default: false
    // },
    updated: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.validateUser = function validateUser(){
    this.validated = true;
}

UserSchema.methods.isValidPassword = async function isValidPassword(password){
    const result = await bcrypt.compare(password, this.password);

    return result;
}

//changing password to hash
UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    // this.email = "something" 
    next();
});

UserSchema.post('save', async function(){
    console.log(this);
});

UserSchema.pre('update', async function(next){
    this.updated = Date.now;
    next();
});

UserSchema.post('update', async function(){
    console.log(this);
});

// UserSchema.methods.getOrders = async function getOrders({
//     return mongoose.model("Order").find({userId: this._id});
// })
   



module.exports = mongoose.model('User', UserSchema);