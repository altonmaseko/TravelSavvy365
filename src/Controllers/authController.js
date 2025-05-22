import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();


export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login request received:', { email, password });
    
    // Simulate a database check
    //TODO
    if (email && password){

        //simulate database user
        const modelUser = {
            id: 1,
            name: "John Doe",
            email: email,
            password: password, 
            employeeType: "employee"
        };

        const token = generateToken(modelUser);


        res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000 
    });

    res.json({ message: "Login successful" });
        

    } else {
        return res.status(401).json({
            message: 'Invalid email or password'
        });
    }
};


function generateToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.employeeType },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
}



