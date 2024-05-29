import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { USERS } from "../consts";

export const login = async (req: Request, res: Response) => {
    const { username } = req.body;
    try {
        let user = USERS.find((item) => item === username);
        if (!user) {
            return res.status(400).json({ msg: "Invalid User" });
        }

        const payload = {
            user: {
                id: username,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET as string,
            {
                expiresIn: 3600,
            },
            (err: Error | null, token?: string) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};
