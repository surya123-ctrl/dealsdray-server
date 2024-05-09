const express = require('express');
const router = express.Router();
const { getEmployeeData, deleteEmployeeData, updateEmployeeData, getIndividualEmployeeData } = require('../controllers/employeeDetails.controller')
router.get('/getEmployeeDetails', getEmployeeData);
router.delete('/deleteEmployeeDetails/:id', deleteEmployeeData);
router.put('/updateEmployeeDetails/:id', updateEmployeeData);
router.get('/getIndividualEmployeeDetails/:id', getIndividualEmployeeData);
module.exports = router;