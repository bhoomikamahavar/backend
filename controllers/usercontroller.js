const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
        /*const user = new User(req.body);*/
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        const newuser = await user.save();
        res.status(201).json({
            message: "User created successfully",
            data: newuser
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bad request", message: error.message });
    }
}

const getUser = async (req, res) => {
    console.log(req.body);
    const users = await User.find();
    res.send(users);
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        console.log("password:", password);
        console.log("user.password:", user.password);

        if (!user.password) {
            return res.status(500).json({ message: "Password not found in DB" });
        }

        const isPasswordmatch = await bcrypt.compare(password, user.password);
        if (!isPasswordmatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }




        const token = jwt.sign(
            { id: user._id },
            "abc1212334fsf",
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "lax",
            secure: false,
        });

        return res.status(200).json({
            message: "User login successfully",
            user: {
                token,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message
        });
    }
};

const getuserprofile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select("-password -__v -_id");

        // 3. Success response
        res.status(200).json({
            message: "User profile fetched successfully",
            user
        });
    } catch (error) {
        console.log(error);
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(201).json({
            message: "User logout successfully"
        });
    } catch (error) {
        res.status(400).json({ message: "Bad request", message: error.message });
    }
}

const forgetpassword = (req, res) => {

}

const updatepassword = (req, res) => {

}

module.exports = { register, login, logout, getUser, getuserprofile }