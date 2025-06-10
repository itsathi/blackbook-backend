// filepath: /auth-app/auth-app/Models/Adminmodel.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;