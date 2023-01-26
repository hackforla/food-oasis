import awsService from "../services/aws-service"
import { RequestHandler } from "express";

const autocomplete: RequestHandler<
    never,
    any[],
    { params: string | Record<string, never> },
    never
> = async (req, res) => {
    try {
        const { address } = req.query;
        const response: any = await awsService.autocomplete(address);
        res.send(response);
    } catch (err: any) {
        res.json(err);
    }
};

const getCoords: RequestHandler<
    never,
    any[],
    { params: string | Record<string, never> },
    never
> = async (req, res) => {
    try {
        const { address } = req.query;
        const response: any = await awsService.getCoords(address);
        res.send(response);
    } catch (err: any) {
        res.json(err);
    }
};

export default {
    autocomplete,
    getCoords
};
