const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    uID:{
        type: String,
        required: true,
    },
    uName:{
        type: String,
        required: true,
    },
    uImage: {
        type: String,
        required: true,
    },
    uType: {
        type: String,
        requried: true,
    },
    created: {
        type: Date,
        default: Date.now
    }
});
    
ChatSchema.pre('update', async function(next){
    this.updated = Date.now;
    next();
});
ChatSchema.post('update', async function(){
    console.log(this);
});

module.exports = mongoose.model('Chat', ChatSchema);