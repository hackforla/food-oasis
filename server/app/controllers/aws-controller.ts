import awsService from "../services/aws-service"
import { RequestHandler } from "express";
import { SearchPlaceIndexForTextResponse } from "aws-sdk/clients/location";

const autocomplete: RequestHandler<
    never,
    SearchPlaceIndexForTextResponse,
    { params: string | Record<string, never> },
    never
> = async (req, res) => {
    try {
        const { address } = req.query;
        const response = await awsService.autocomplete(address);
        res.send(response);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

const getCoords: RequestHandler<
    never,
    SearchPlaceIndexForTextResponse,
    { params: string | Record<string, never> },
    never
> = async (req, res) => {
    try {
        const { address } = req.query;
        const response = await awsService.getCoords(address);
        res.send(response);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export default {
    autocomplete,
    getCoords
};
