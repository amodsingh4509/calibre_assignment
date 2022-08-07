import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({

    username:{
        type: String,
        unique:true,
        required:true,
    },
    role:{
        type: String,
        requried: true,
    },

},
    { timestamp: true }
)


export default mongoose.model('Users', UserSchema);