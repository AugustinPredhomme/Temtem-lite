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
            return APIResponse(res, [], 'User not found', 404);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return APIResponse(res, [], 'Incorrect password', 401);
        }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        res.cookie('accessToken', accessToken, { 
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 1000*60*15 //15min
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 1000*60*60*24*7 //7j
        });
                
        return APIResponse(res, { id : user.id, role:user.role }, 'Login successful', 200);
    } catch (error) {
        console.error(error);
        return APIResponse(res, [], 'Login failed', 500);
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await User.findAll();
        
        if (!allUsers) {
            return APIResponse(res, [], 'No user found', 404);
        }
        return APIResponse(res, allUsers, 'All users have been returned', 200);
    } catch (error: any) {
        console.log(error);
        return APIResponse(res, [], 'Get all users failed', 500);
    }
}

export const getAllUsersClient = async (req: Request, res: Response) => {
    try {
        const allUsers = await User.findAll({
            attributes: ['username', 'first_name', 'last_name']
        });

        if (!allUsers) {
            return APIResponse(res, [], 'No user found', 404);
        }
        return APIResponse(res, allUsers, 'All users have been returned', 200);
    } catch (error: any) {
        console.log(error);
        return APIResponse(res, [], 'Get all users failed', 500);
    }
};

export const checkProfile = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.userId);
        const user = await User.findOne({ attributes: ['username', 'first_name', 'last_name', 'birthday', 'country', 'phone'], where: { id }});

        if(!user) {
            return APIResponse(res, [], 'User not found', 404);
        }

        return APIResponse(res, user, 'User profile checked successfully', 200);
    } catch (error) {
        console.error(error);
        return APIResponse(res, [], 'User profile check failed', 500);
    }
};

export const modifyProfile = async (req: Request, res: Response) => {
    try {
        const id = req.params.userId;
        const getUser = await User.findOne({ attributes: ['username', 'email', 'password'], where: { id: id }});
        req.body.username = getUser?.username;
        req.body.email = getUser?.email;
        req.body.password = getUser?.password;
        const validatedUser = await userSchema.validate(req.body);
        const { firstName, lastName, birthday, country, phone } = validatedUser;
        if (getUser) {
            await User.update( {
                username: getUser.username,
                first_name: firstName,
                last_name: lastName,
                email: getUser.email,
                password: getUser.password,
                birthday: birthday,
                country: country,
                phone: phone
            }, {
                where: {
                    id: id
                },
            },);
            return APIResponse(res, id, 'User profile modified successfully', 200);
        }
    } catch (error) {
        console.error("User couldn't be updated: ", error);
    }
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return APIResponse(res, {clearLocalStorage: true}, 'User disconnected successfully', 200);
};