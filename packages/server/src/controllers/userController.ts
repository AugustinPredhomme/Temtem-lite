import { Request, Response } from 'express';
import { User } from '../models/User';
import * as userService from '../services/userService';
import { userSchema } from '../schemas/user';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const validatedUser = await userSchema.validate(req.body);
        const newUser = await userService.createUser(validatedUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await userService.loginUser(email, password);
        if (user) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};