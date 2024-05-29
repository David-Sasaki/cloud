import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

export const setupMiddleware = (app: express.Application) => {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
};
