import User from '../Model/user.model.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'jwt_secret_key'; 

// generate jwt Tokens
export const generateToken = (user) => {
    return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '30m' });
};


export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ error: 'Not authorized, token is missing' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ error: 'Not authorized, invalid token' });
    }
};

// POST/register -- register a new user
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // checks if user already exist
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // create new user
        user = new User({ username, email, password });
        await user.save();

        // generate token
        const token = generateToken(user);
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST/login -- authenticate user and return a JWT token
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // if user exists -- checks
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // generate token
        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const token = ""; 

// fetch('http://localhost:5000/api/cart', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//     },
//     body: JSON.stringify({ productId: '670681b00c7cdb406d8c037f', quantity: 1 })
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error('Error:', error));

