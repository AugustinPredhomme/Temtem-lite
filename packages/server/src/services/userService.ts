import { User } from '../models/User';
import { pool } from '../config/database';
import * as bcrypt from 'bcrypt';

export const createUser = async (user: User): Promise<User> => {
    const hashedPassword = await bcrypt.hash(user.passwordHash, 10);
    user.passwordHash = hashedPassword;

    const [result] = await pool.query('INSERT INTO users SET ?', [user]);
    return { ...user};
};

export const loginUser = async (email: string, password: string): Promise<User | null> => {
    try {
        const rows = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) {
            console.log("Email doesn't exist");
            return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log('Wrong password');
            return null;
        }
        return user as User;

    } catch (error) {
        console.error('Error during login: ', error);
        return null;
    }
    
};