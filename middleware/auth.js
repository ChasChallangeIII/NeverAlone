export const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  // if (!token) {
  //   return res.status(401).send("No token, access denied");
  // }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    // if (err) {
    //   return res.status(403).send("Access denied");
    // }
    req.user = user;
    next();
  });

  next();
};

export const authorizeAdmin = (req, res, next) => {
  //check for admin permission in jwt
  next();
};
