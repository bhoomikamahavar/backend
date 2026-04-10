const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const auth = async (req, res, next) => {
    try {
        console.log("cookies from middleware",req.cookies.token); // cookies from middleware eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2FmNzM5ZDRmNTc4YWEwMjc0OTE2MiIsImlhdCI6MTc2OTcyNDg4MiwiZXhwIjoxNzY5NzI4NDgyfQ.u8HcLZ2SkwRwJgKdWvNoD3A7u1yurg-fsqur-tiQ8KA
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({error: "Unauthorized access, no token provided"});
        }
        const decoded = jwt.verify(token, "abc1212334fsf");
        console.log(decoded); // ex: { id: '697af739d4f578aa02749162', iat: 1769724882, exp: 1769728482 }
        console.log("token decoded",decoded.id); // 697af739d4f578aa02749162
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(401).json({
                error: "Unauthorized access, user not found."
            });
        }
        console.log("user login data",user);
        req.user = user; // attach user data to request object for use in next middleware or route handler
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({error: "Not authorized. Invalid/Expired token"});
    }
}

module.exports = auth;