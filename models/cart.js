const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    cartName: {
        type: String,
        required: true,
    },
    cartPrice: {
        type: Number,
        require: true
    },
    cartImage: {
        type: String,
        require: true
    },
    cartPcs: {
        type: Number,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    }
});
    
CartSchema.pre('update', async function(next){
    this.updated = Date.now;
    next();
});
CartSchema.post('update', async function(){
    console.log(this);
});

module.exports = mongoose.model('Cart', CartSchema);