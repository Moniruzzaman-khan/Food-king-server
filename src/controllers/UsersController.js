const UsersModel = require('../models/UsersModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Registration
exports.registration = async (req, res) => {
    try {
        // Check if the password is provided
        if (!req.body.password) {
            return res.status(400).json({ status: "Failed", data: "Password is required" });
        }

        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password with the generated salt
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user with the hashed password
        const user = await UsersModel.create({
            name: req.body.name,
            password: hashPassword,
            email: req.body.email,
            location: req.body.location
        });

        // Respond with the created user data
        res.status(200).json({ status: "success", data: user });
    } catch (err) {
        // Handle any errors that occurred during the process
        res.status(500).json({ status: "Failed", data: err.message });
    }
};


//Login
exports.login = async (req, res) => {
    try {
        // Find the user based on the provided email
        const user = await UsersModel.findOne({ email: req.body.email });

        if (!user) {
            // If the user does not exist, return Unauthorized
            return res.status(401).json({ status: "Failed", data: "Unauthorized" });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            // If passwords do not match, return Unauthorized
            return res.status(401).json({ status: "Failed", data: "Unauthorized" });
        }

        // If credentials are valid, generate JWT token
        const payload = {
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
            data: user.email
        };
        const token = jwt.sign(payload, 'SecretKey123456789');

        // Respond with success and token
        res.status(200).json({ status: "success", token: token, data: user });
    } catch (err) {
        // Handle any errors that occurred during the process
        res.status(500).json({ status: "Failed", data: err.message });
    }
};

