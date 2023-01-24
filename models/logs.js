const mongoose = require('mongoose');

const LogsSchema = mongoose.Schema({
    address: {
        type: String
        
    },
    name: {
        type: String
      
    },
    mobileNum: {
        type: String
    },
    amount: {
        type: String
    },
    typeOfDelivery: {
        type: String
        
    },
    created: {
        type: Date,
        default: Date.now
    }
});
    
LogsSchema.pre('update', async function(next){
    this.updated = Date.now;
    next();
});
LogsSchema.post('update', async function(){
    console.log(this);
});

module.exports = mongoose.model('Logs', LogsSchema);