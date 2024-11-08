import { Request, Response } from 'express';
import { User } from '../models/User';
import { userSchema } from '../schemas/user';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { APIResponse } from '../utils/response';


export const registerUser = async (req: Request, res: Response) => {
    try {
        const validatedUser = await userSchema.validate(req.body);
        const { username, email, password } = validatedUser;
        const existingUser = await User.findOne({ where: { [Op.or]: [{ username }, { email }]}});
        if (existingUser) {
            APIResponse(res, [], 'Username or Email already exists', 400);
        }
        const newUser = await User.create({ username, email, password });
        APIResponse(res, newUser, 'User created successfully!', 201);
    } catch (error: any) {
        console.log(error);
        APIResponse(res, [], 'Error creating user', 500);
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const validatedUser = await userSchema.validate(req.body);
        const { email, password } = validatedUser;
        const user = await User.findOne({ where: { email }});

        if (!user) {
            return APIResponse(res, [], 'User not found', 400);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return APIResponse(res, [], 'Incorrect password', 401);
        }

        //Generate JWT token
        //APIResponse(res, { token }, 'Login successful', 200);
        APIResponse(res, [], 'Login successful', 200);
    } catch (error) {
        console.error(error);
        APIResponse(res, [], 'Login failed', 500);
    }
};