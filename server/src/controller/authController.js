import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "30d",});
};

// Sign Up User

export const signUpUser = async (req, res) => {
    try {
        const { name, email, password, contact } = req.body;

        if (!name || !email || !password || !contact) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const image = req.file ? req.file.path : "";

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            contact,
            image
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            contact: user.contact,
            image: user.image,
            token: generateToken(user._id)
        })
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};

// Login

export const loginUser = async (req,res) => {
    const {email , password} = req.body;

    const user = await User.findOne({email});
    const userPassword = await bcrypt.compare(password, user.password); 

    if(user && userPassword) {
        res.json({
            user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            contact: user.contact,
            image: user.image,
            },
            token: generateToken(user._id),
        })
    }
    else {
        res.status(401).json({message: "Invalid credentials"})
    }
};