const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
   
    teacherName: {type:String},
    address : {type:String},
    phone :{type: String},
    Bcc: { type: String},
    Dob: { type: String},
    gender: { type: String},
    Father : {type:String},
    Mother: {type:String},
    joiningDate: {type:String},
    qualification : {type:String},
},{ timestamps : false});

module.exports = mongoose.model('Teachers' ,teacherSchema);  