import { Request, Response } from "express";
import { APIResponse } from "../utils/response";


export const clearAllData = async (request: Request, response: Response) => {
    // clear all data
    APIResponse(response, [], 'La donnée a été intégralement supprimée');
};