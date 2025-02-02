import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { APIResponse } from '../utils';

export const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.query;
    const userIdString = userId?.toString()
    const user = await User.findByPk(userIdString);

    if (!user) {
      return APIResponse(res, [], 'Admin User not found', 400);
    }

    if (user.role !== 'admin') {
        return APIResponse(res, [], 'Access Denied : User must be admin', 403);
    }
    next();
  } catch (error) {
    console.error('Error checking admin role:', error);
    return APIResponse(res, [], 'Internal Server Error', 500);
  }
};