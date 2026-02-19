const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
