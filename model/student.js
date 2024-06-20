const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   
    studentName: {type:String},
    admissionNo : {type:String},
    Bcc: { type: String},
    Dob: { type: String},
    gender: { type: String},
    address : {type:String},
    Father : {type:String},
    Mother: {type:String},
    Std: {type:String},
    phone:{ type: String},
    ispassout:{type: String,
        default: "false"  
    },
    istransfer: { type: String,
        default: "false"
    }

},{ timestamps : false});

module.exports = mongoose.model('Students' ,userSchema);  