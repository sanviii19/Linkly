import { UserModel } from '../models/user.model.js';
import ShortUrlModel from '../models/shorturlSchema.js';

const findUserByEmail = async (email) => {
    // Logic to find a user by email in the database
    return await UserModel.findOne({ email }).select('+password');
}

const findUserById = async (id) => {
    // Logic to find a user by ID in the database
    return await UserModel.findById(id);
}

const createUser = async (name, email, password) => {
    // Logic to create a new user in the database
    const newUser = new UserModel({
        name,
        email,
        password,
    });
    await newUser.save();
    
    console.log("-----inside createUserDao-----");
    
    return newUser;
}

const getAllUserUrls = async (id) => {
    // Logic to get all URLs associated with a user
    return await ShortUrlModel.find({ user: id }).sort({ createdAt: -1 });
}

export { findUserByEmail, findUserById, createUser, getAllUserUrls };