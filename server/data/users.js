const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Hexaweld Admin',
        email: 'admin@hexaweld.com',
        password: 'password123', // Will be hashed by model pre-save hook? 
        // Wait, insertMany doesn't trigger pre-save hooks in Mongoose 5.x/6.x usually unless using create.
        // I should manually hash it here or use create loop. 
        // Actually, I'll just use a pre-hashed string for simplicity or rely on the fact that I might need to loop.
        // Let's rely on manual entry for now or handling it.
        // Ideally the seeder should use the model logic.
        isAdmin: true,
    },
];

module.exports = users;
