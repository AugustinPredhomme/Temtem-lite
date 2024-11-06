export interface User {
    username: string;
    firstName?: string;
    lastName?: string;
    email: string;
    passwordHash: string; //hash password before storing it
    role?: string; // user / admin
    birthday?: Date;
    country?: string;
    phone?: string;
}