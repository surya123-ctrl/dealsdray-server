const mongoose = require('mongoose');
const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        enum: ['HR', 'Manager', 'Sales'],
        required: true
    },
    gender: {
        type: String,
        enum: ['M', 'F'],
        required: true
    },
    course: [{
        type: String,
        enum: ['MCA', 'BCA', 'BSC'],
        required: true
    }]
}, { timestamps: true });
const employeeModel = mongoose.model("Employee", employeeSchema);
module.exports = employeeModel