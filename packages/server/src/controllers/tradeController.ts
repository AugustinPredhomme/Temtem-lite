import { Request, Response } from "express";
import { APIResponse } from "../utils/response";
//import { Trade } from "../models/Trade";


export const createTrade = async (request: Request, response: Response) => {
    //include create trade logic
    return APIResponse(response, [], 'Trade has been done successfully');
};


export const checkTrade = async (request: Request, response: Response) => {
    //include check trade logic
    return APIResponse(response, [], 'Trade has been checked successfully');
};