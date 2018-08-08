import mongoose from 'mongoose';

var authorSchema = new mongoose.Schema({
    name: String,
    description: String,
    dob: Date,
    genre: [String],
    author_img: String
});

export default mongoose.model('Author', authorSchema);
