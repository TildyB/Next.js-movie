import mongoose from 'mongoose';


const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: String,
    sub: String,
    email: {type: String, required: true},
    likedReviews: [String]
})


const User =mongoose.models.User || mongoose.model('User', userSchema);

export default User;
