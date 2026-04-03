const roles = {
  admin,
  viewer,
  Analyst,
};

exports.allowRoles = (...roles) => {
  return (req, res, next) => {
    // req.user.role comes from logged-in user's JWT token
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
};
