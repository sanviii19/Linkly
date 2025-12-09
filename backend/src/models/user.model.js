import mongoose from 'mongoose';
import argon2 from 'argon2';

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

const ARGON2_OPTIONS = {
  type: argon2.argon2id,   // Best practice: use Argon2id
  timeCost: 3,             // Number of iterations
  memoryCost: 2 ** 16,     // 64 MB
  parallelism: 1,
};

// Hash password before saving user
UserSchema.pre('save', async function (next) {
  // `this` = document being saved
  if (!this.isModified('password')) {
    // If password not changed, skip hashing
    return next();
  }

  try {
    const hashed = await argon2.hash(this.password, ARGON2_OPTIONS);
    this.password = hashed;
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare raw password with stored hash
UserSchema.methods.comparePassword = async function (plainPassword) {
  try {
    return await argon2.verify(this.password, plainPassword);
  } catch (err) {
    return false;
  }
};


const UserModel = model('User', UserSchema)

export { UserModel };