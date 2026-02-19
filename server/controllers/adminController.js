const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Create a new admin user
// @route   POST /api/admin/create-admin
// @access  Private/SuperAdmin
const createAdmin = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const validRoles = ['superadmin', 'admin', 'editor'];
    if (!validRoles.includes(role)) {
        res.status(400);
        throw new Error('Invalid role specified');
    }

    const user = await User.create({
        name,
        email,
        password,
        isAdmin: true,
        role,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    List all admin users
// @route   GET /api/admin/list-admins
// @access  Private/SuperAdmin
const listAdmins = asyncHandler(async (req, res) => {
    const admins = await User.find({ isAdmin: true }).select('-password').sort({ createdAt: -1 });
    res.json(admins);
});

// @desc    Delete an admin user
// @route   DELETE /api/admin/:id
// @access  Private/SuperAdmin
const deleteAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Prevent superadmin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
        res.status(400);
        throw new Error('Cannot delete your own account');
    }

    await User.deleteOne({ _id: req.params.id });
    res.json({ message: 'Admin removed successfully' });
});

module.exports = { createAdmin, listAdmins, deleteAdmin };
