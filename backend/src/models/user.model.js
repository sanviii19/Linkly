import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const UserModel = model('User', UserSchema)

export { UserModel };