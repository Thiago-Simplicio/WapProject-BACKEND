import { Schema, model } from 'mongoose';

interface User {
    name_user?: string | any;
    email_user?: string | any;
}

const UserSchema = new Schema({
    name_user: {
        type: String
    },
    email_user: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default model<User>('Users', UserSchema);