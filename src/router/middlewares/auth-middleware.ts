export const authenticationMiddleware = () => (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
};
