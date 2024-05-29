import passport from "passport";
import passportJWT from "passport-jwt";
import { USERS } from "./consts";

const { ExtractJwt, Strategy: JwtStrategy } = passportJWT;

export const configurePassport = () => {
    const jwtOptions: any = {};
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = process.env.JWT_SECRET;

    const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
        try {
            const user = USERS.find(jwt_payload.id);
            if (user) {
                next(null, user);
            } else {
                next(null, false);
            }
        } catch (error) {
            next(error, false);
        }
    });

    passport.use(strategy);
};
