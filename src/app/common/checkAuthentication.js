exports.checkAuth = (req, res, next) => {
  const redirects = {
    "/admin": { loginPath: "/admin/login", token: "accessTokenAdmin" },
    "/staff": { loginPath: "/staff/login", token: "accessTokenStaff" },
  };
  console.log(req.path.startsWith(path), "req.path.startsWith(path)");
  const redirectConfig = Object.keys(redirects).find((path) =>
    req.path.startsWith(path)
  );

  if (redirectConfig) {
    const { loginPath, token } = redirects[redirectConfig];

    if (!req.cookies[token]) {
      return res.redirect(loginPath);
    }
  }

  next();
};

exports.checkAuthAdmin = (req, res, next) => {
  const token = req.cookies.accessTokenAdmin;

  // check token verify with jwt
  if (!token) {
    return res.redirect("/admin/login");
  }

  // check token
  const accessTokenSecret = process.env.ACCESS_TOKEN_ADMIN_SECRET;
  try {
    const decoded = jwt.verify(token, accessTokenSecret);
    console.log(decoded, "decoded");
    req.admin = decoded;
  } catch (error) {
    return res.redirect("/admin/login");
  }
  next();
};
