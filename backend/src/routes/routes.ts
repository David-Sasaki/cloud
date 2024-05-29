import express from "express";
import authRoutes from "./authRoutes";
import fileRoutes from "./fileRoutes";

export const setupRoutes = (app: express.Application) => {
    app.use("/auth", authRoutes);
    app.use("/file", fileRoutes);
}
