export const authenticationMiddleware = () => (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).json({errors: 'Unauthorized'})
};
