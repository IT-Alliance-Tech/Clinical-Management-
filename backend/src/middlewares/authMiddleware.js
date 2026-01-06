const protectAdmin = (req, res, next) => {
  try {
    // temporary allow access
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = { protectAdmin };
