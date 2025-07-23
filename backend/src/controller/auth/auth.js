import { model } from '../../database/index.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secreate'; // Use process.env.JWT_SECRET in production!

export const register = async (req, res) => {
  try {
    const { username, email, password, conPassword } = req.body;

    // Validation
    if (!username || !email || !password || !conPassword)
      return res.status(400).json({ error: 'All fields are required' });

    if (password !== conPassword)
      return res.status(400).json({ error: 'Passwords do not match' });

    const existingUser = await model.User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ error: 'Email already registered' });

    const newUser = new model.User({ username, email, password });
    await newUser.save();

    const token = jwt.sign(
      { email: newUser.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    console.log(token);
    return res.status(201).json({
      message: "User created successfully",
      data: {
        username: newUser.username,
        email: newUser.email,
        token
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

export const login = async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required' });

    const user = await model.User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(401).json({ error: 'Invalid credentials' });

 

    res.status(200).json({
      message: 'Login successful',
      data:{
        email:user.email,
      }

    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
