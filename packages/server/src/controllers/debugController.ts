import { Request, Response } from "express";
import { APIResponse } from "../utils/response";
import { User } from "../models/User";


export const clearAllData = async (request: Request, response: Response) => {
    await User.destroy({
        truncate: true
    });
    return APIResponse(response, [], 'All data has been deleted');
};