import jwt from 'jsonwebtoken';
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded;

    next();
  } catch (error) {
    console.error('Error in protectRoute middleware', error);

    res.status(500).json({
      message: 'Server error',
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({
      authenticated: true,
      admin: req.admin,
    });
  } catch (error) {
    console.error('Error in checkAuth', error);

    res.status(500).json({
      message: 'Server Error',
    });
  }
};
