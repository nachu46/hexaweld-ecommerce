const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const connectDB = require('./config/db');

dotenv.config();

/**
 * Robust User Management CLI for HexaWeld
 * Usage: node manageUsers.js --email=admin@example.com --password=newpass --role=admin --name="User Name"
 */

const getArgs = () => {
    const args = {};
    process.argv.slice(2).forEach(arg => {
        if (arg.startsWith('--')) {
            const [key, value] = arg.split('=');
            args[key.replace('--', '')] = value;
        }
    });
    return args;
};

const manageUser = async () => {
    try {
        await connectDB();
        const { email, password, role, name } = getArgs();

        if (!email) {
            console.log('\n--- HexaWeld User Management CLI ---');
            console.log('Usage: node manageUsers.js --email=user@example.com [--password=...] [--role=...] [--name=...]\n');
            process.exit(1);
        }

        let user = await User.findOne({ email });

        if (user) {
            console.log(`\n[Found] User exists: ${email}`);
            let isUpdated = false;

            if (password) {
                user.password = password;
                console.log(` -> Password will be reset for: ${email}`);
                isUpdated = true;
            }
            if (role) {
                user.role = role;
                user.isAdmin = (role === 'admin' || role === 'superadmin');
                console.log(` -> Role updated to: ${role}`);
                isUpdated = true;
            }
            if (name) {
                user.name = name;
                console.log(` -> Name updated to: ${name}`);
                isUpdated = true;
            }

            if (isUpdated) {
                await user.save();
                console.log(`\n[Success] Credentials updated successfully for: ${email}\n`);
            } else {
                console.log(' -> No updates provided. Use --password, --role, or --name to make changes.\n');
            }
        } else {
            console.log(`\n[Not Found] User ${email} does not exist. Creating new account...`);
            if (!password || !name) {
                console.error('Error: --password and --name are required to create a new user.\n');
                process.exit(1);
            }

            const newUser = await User.create({
                name,
                email,
                password,
                role: role || 'admin',
                isAdmin: (role === 'admin' || role === 'superadmin' || !role)
            });
            console.log(`\n[Success] New user created: ${newUser.email} (${newUser.role})\n`);
        }

        process.exit();
    } catch (error) {
        console.error(`\n[Error] ${error.message}\n`);
        process.exit(1);
    }
};

manageUser();
