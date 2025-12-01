import { cookieOptions } from '../config/config.js';
import { loginService, signupService } from '../services/auth.services.js';
import wrapAsync from '../utils/tryCatchWrapper.js';

const signupController = wrapAsync(async (req, res) => {
    // Signup logic here
    const { name, email, password } = req.body;
    const token = await signupService(name, email, password);

    req.user = user;
    res.cookie('token', token, cookieOptions);
    res.status(201).json(
        {
            isSuccess: true,
            message: 'User registered successfully',
            data: token,
        }
    )

});

const loginController = wrapAsync(async (req, res) => {
    // Login logic here
    const { email, password } = req.body;
    const {token, user} = await loginService(email, password);

    req.user = user;
    res.cookie('token', token, cookieOptions);
    res.status(200).json(
        {
            isSuccess: true,
            message: 'User logged in successfully',
            data: token,
        }
    )

});

export { signupController, loginController };