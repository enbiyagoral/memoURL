const bcrypt = require('bcrypt');
const User = require('../model/User');
const Url = require('../model/Url');

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  let user = null;
  user = await User.findOne({ email: email });
  let same = null;
  same = await bcrypt.compare(password, user.password);

  if (same) {
    console.log('Şifre doğrulandı.');
    req.session.isAuth = true;
    req.session.userID = user._id;
    return res.redirect('/');
  } else {
    res.cookie('isAuth', 0);
    console.log('Şifre yanlış.');
    return res.redirect('/');
  }
};

module.exports.logoutUser = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};

module.exports.getDashboardPage = async (req, res) => {
  const url = await Url.find({ user: req.session.userID }).sort('-date');
  res.status(200).render('dashboard', {
    url,
    page_name : 'dashboard'
  });
};

module.exports.createUser = async (req, res) => {
  console.log(req.body);
  const user = await User.create(req.body);
  res.redirect('/');
};
