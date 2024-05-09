const express = require('express');
const employeeModel = require('../models/employee.model');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const generateToken = require('../utils/generateToken')
const signup = async (req, res) => {
    try {
        console.log("Inside Signup")
        const { name, email, password, mobile, designation, gender, course } = req.body;
        const existingUser = await employeeModel.findOne({ email, name });
        if (existingUser) return res.status(404).json({ message: 'Email already exists!' });

        if (!validator.isEmail(email)) return res.status(400).json({ message: 'Invalid email address!' });
        if (!validator.isMobilePhone(mobile, 'any', { strictMode: false }) || mobile.length !== 10) return res.status(400).json({ message: 'Invalid mobile number!' })
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long and contain at least one capital letter, one number, and one special character."
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createdUser = await employeeModel.create({
            name,
            email,
            password: hashedPassword,
            mobile,
            designation,
            gender,
            course
        })
        if (createdUser) {
            await createdUser.save();
            return res.status(201).json({ message: "User created Successfully!" })
        }
        else {
            res.status(500).json({ message: "Unable to create user!", error })
        }
    }
    catch (error) {
        console.log("Internal error : ", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const foundUser = await employeeModel.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, foundUser?.password || "");
        if (!foundUser || !isPasswordCorrect) return res.status(400).json({ message: 'Invalid Name or Password!' });
        const token = generateToken({
            userId: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
            mobile: foundUser.mobile,
            designation: foundUser.designation,
            gender: foundUser.gender,
            course: foundUser.course
        });
        console.log(token);
        res.status(200).json({ message: `Welcome ${foundUser.name}`, token });
    }
    catch (error) {
        console.log('Internal Server Error', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

module.exports = { signup, login }