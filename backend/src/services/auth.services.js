import { createUser, findUserByEmail } from '../dao/user.dao.js';
import { ConflictError } from '../utils/errorHandler.js';
import { signToken } from '../utils/jwtHelper.js';

const signupService = async (name, email, password) => {
    // Signup logic here
    const user = await findUserByEmail(email);
    if(user) throw new ConflictError('User already exists');

    const newUser = await createUser(name, email, password);
    const token = await signToken({ id: newUser._id });
    return {token, user: newUser};
}

const loginService = async (email, password) => {
    // Login logic here
    const user = await findUserByEmail(email);

    if(!user) throw new ConflictError('Invalid credentials');
    
    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid) throw new ConflictError('Invalid credentials');
    
    const token = signToken({ id: user._id });
    return {token, user};
}

export { signupService, loginService };