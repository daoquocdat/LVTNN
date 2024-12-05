class CustomerController {
  //[GET] /profile
  async loginGoogle(req, res) {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
    res.redirect(url);
  }
}

module.exports = new CustomerController();
