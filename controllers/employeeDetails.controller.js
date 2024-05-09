const employeeModel = require('../models/employee.model');
const validator = require('validator');
const getEmployeeData = async (req, res) => {
    try {
        const data = await employeeModel.find();
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching employee data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
const deleteEmployeeData = async (req, res) => {
    const employeeId = req.params.id;
    try {
        const deletedEmployee = await employeeModel.findByIdAndDelete(employeeId);
        if (!deletedEmployee) return res.status(404).json({
            message: 'Employee not found!'
        })
        res.status(200).json(`Employee with Id ${employeeId} has been deleted from database!`)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updateEmployeeData = async (req, res) => {
    console.log("Updating")
    const employeeId = req.params.id;
    console.log(employeeId)
    try {
        const { name, email, password, mobile, designation, gender, course } = req.body;
        if (!name || !email || !mobile || !designation || !gender || !course) {
            return res.status(400).json({ message: 'Please provide all required fields!' });
        }

        // Check if email is valid
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email address!' });
        }

        // Check if mobile number is valid
        if (!validator.isMobilePhone(mobile, 'any', { strictMode: false }) || mobile.length !== 10) {
            return res.status(400).json({ message: 'Invalid mobile number!' });
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long and contain at least one capital letter, one number, and one special character."
            })
        }
        const updatedEmployee = await employeeModel.findByIdAndUpdate(employeeId, req.body, { new: true });
        res.status(201).json({ message: `Employee with Id ${employeeId} has been successfully updated!`, updatedEmployee })
    } catch (error) {
        res.status(400).json({ message: "Error in Updating data." });
    }
}
const getIndividualEmployeeData = async (req, res) => {
    console.log('Getting');
    const employeeId = req.params.id;
    try {
        const individualEmployee = await employeeModel.findById(employeeId);
        res.status(200).json(individualEmployee);
    } catch (error) {
        res.status(404).json({ message: `No Employee with the id of ${employeeId}` });

    }
}
module.exports = { getEmployeeData, deleteEmployeeData, updateEmployeeData, getIndividualEmployeeData };