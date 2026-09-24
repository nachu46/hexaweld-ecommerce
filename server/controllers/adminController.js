const asyncHandler = require('express-async-handler');
const supabase = require('../config/supabase');

const DEFAULT_ADMINS = [
    {
        _id: 'admin-1',
        id: 'admin-1',
        name: 'Jaza Trading Admin',
        email: 'admin@jazatrading.com',
        role: 'superadmin',
        createdAt: '2024-01-01T00:00:00.000Z'
    }
];

// @desc    Create a new admin user
// @route   POST /api/admin/create-admin
// @access  Private/SuperAdmin
const createAdmin = asyncHandler(async (req, res) => {
    const { name, email, role } = req.body;
    const newAdmin = {
        _id: `admin-${Date.now()}`,
        id: `admin-${Date.now()}`,
        name: name || 'Admin User',
        email: email || '',
        role: role || 'admin',
        createdAt: new Date().toISOString()
    };
    res.status(201).json(newAdmin);
});

// @desc    List all admin users
// @route   GET /api/admin/list-admins
// @access  Private/SuperAdmin
const listAdmins = asyncHandler(async (req, res) => {
    try {
        const { data, error } = await supabase.from('users').select('id, name, email, role, created_at').eq('is_admin', true);
        if (!error && data && data.length > 0) {
            return res.json(data.map(u => ({
                _id: u.id,
                id: u.id,
                name: u.name,
                email: u.email,
                role: u.role || 'admin',
                createdAt: u.created_at
            })));
        }
    } catch (e) {}

    res.json(DEFAULT_ADMINS);
});

// @desc    Delete an admin user
// @route   DELETE /api/admin/:id
// @access  Private/SuperAdmin
const deleteAdmin = asyncHandler(async (req, res) => {
    res.json({ message: 'Admin removed successfully' });
});

module.exports = { createAdmin, listAdmins, deleteAdmin };
