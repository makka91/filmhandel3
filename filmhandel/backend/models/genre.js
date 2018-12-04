const mongoose = require('mongoose');

//Schema för genre

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    }
});

const Genre = mongoose.model('Genre', genreSchema)

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;