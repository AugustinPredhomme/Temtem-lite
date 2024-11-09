import { Request, Response } from 'express';
import { User } from '../models/User';
import { userSchema } from '../schemas/user';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { APIResponse, generateAccessToken, generateRefreshToken } from '../utils';


export const registerUser = async (req: Request, res: Response) => {
    try {
        const validatedUser = await userSchema.validate(req.body);
        const { username, email, password } = validatedUser;
        const existingUser = await User.findOne({ where: { [Op.or]: [{ username }, { email }]}});
        if (existingUser) {
            return APIResponse(res, [], 'Username or Email already exists', 400);
        }
        const newUser = await User.create({ username, email, password });
        return APIResponse(res, newUser, 'User created successfully!', 201);
    } catch (error: any) {
        console.log(error);
        return APIResponse(res, [], 'Error creating user', 500);
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

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
        
        return APIResponse(res, user.id, 'Login successful', 200);
    } catch (error) {
        console.error(error);
        return APIResponse(res, [], 'Login failed', 500);
    }
};

export const profile = (req: Request, res: Response) => {

    APIResponse(res, 'user.id', 'User profile checked successfully');
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    APIResponse(res, [], 'User disconnected successfully');
};