export const authorizeRole = (...roles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const userRoles = Array.isArray(req.user.role)
            ? req.user.role
            : [req.user.role];

        const allowed = userRoles.some(role =>
            roles.includes(role)
        );

        if (!allowed) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        next();
    };
};