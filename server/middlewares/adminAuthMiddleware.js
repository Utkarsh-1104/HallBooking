import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

const adminAuthMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if( !authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({
            msg: 'Unauthorized',
            status: 403
        })
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role === 'admin' || decoded.role === 'superadmin') {
            req.userId = decoded.userid;
            req.fname = decoded.fname;
            req.lname = decoded.lname;
            req.designation = decoded.designation;
            req.role = decoded.role;
            next();
        } else {
            return res.json({
                msg: 'Unauthorized',
                status: 403
            })
        }
    } catch (error) {
        return res.json({
            msg: 'Unauthorized',
            status: 403
        })
    }
}

export default adminAuthMiddleware;