import { UserModel } from '../models/user.model.js';

const findUserByEmail = async (email) => {
    // Logic to find a user by email in the database
    return await UserModel.findOne({ email });
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
    return newUser;
}

export { findUserByEmail, findUserById, createUser };
