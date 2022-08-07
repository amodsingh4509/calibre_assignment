import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        requried: true,
    }

},
    { timestamp: true }
)


export default mongoose.model('Users', UserSchema);