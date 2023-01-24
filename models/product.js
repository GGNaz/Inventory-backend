const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    foodName: {
        type: String,
        required: true,
    },
    foodPrice: {
        type: Number,
        require: true
    },
    foodImage: {
        type: String,
        require: true
    },
    foodPcs: {
        type: String,
        required: true,
    },
    foodDesc: {
        type: String,
        required: true,
    },
    foodType: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

ProductSchema.pre('update', async function(next){
    this.updated = Date.now;
    next();
});
ProductSchema.post('update', async function(){
    console.log(this);
});

module.exports = mongoose.model('Products', ProductSchema);