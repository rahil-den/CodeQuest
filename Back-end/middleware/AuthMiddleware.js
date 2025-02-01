import jwt from 'jsonwebtoken';
const AuthMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    // console.log(token);
    try {
        if (!token) {
            return res.status(401).json({ message: 'Access Denied, token is not Provided.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        // console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }

    // next();
}

export default AuthMiddleware;