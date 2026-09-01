import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {

        const authHeader =
            req.headers?.authorization ||
            req.headers?.Authorization;

        let token = null;

        // 1. Check Authorization header
        if (typeof authHeader === "string") {

            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            } else {
                token = authHeader;
            }
        }

        // 2. If no header token, check cookies
        if (!token && req.cookies) {
            token =
                req.cookies.accesstoken ||
                req.cookies.refreshtoken;
        }

        // 3. No token
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Required!"
            });
        }

        // 4. Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // 5. Store user information
        req.user = decoded;

        next();

    } catch (err) {

        console.log("AUTH ERROR:", err.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};