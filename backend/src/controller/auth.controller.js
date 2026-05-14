import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;

  //verify credentials
  if (!email || !password) {
    return res.status(400).json({
      message: 'Fill fields',
    });
  }
  try {
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    //create and pass token
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'Logged in successfully',
    });
  } catch (error) {
    console.error('Error in login controller', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
