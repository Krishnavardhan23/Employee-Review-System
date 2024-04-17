const mongoose = require("mongoose");

const empSchema = mongoose.Schema
({
    code: { type: String,unique:true },
    mail:{type: String,unique:true},
    empname: { type: String, required: true },
    password: { type: String},
    age: { type: Number },
    Employeestatus: { type: String, enum: ['Admin', 'Employee','Manager'],default:'Employee', required: true },
    role: { type: String, enum: ['Web Developer', 'Graphic Designer', 'Data Analyst'], required: true },
    rating: { type: Number, default: 2 },
    projectspending:{type:Number,default:0},
    admincode:{type:Number,unique:true}
});

const Employee = mongoose.model("Employee", empSchema);

module.exports = Employee;
