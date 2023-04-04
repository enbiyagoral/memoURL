const Url = require('../model/Url');

module.exports.getIndexPage = async (req, res) => {
  const url = await Url.find().sort('-date').limit(4);
  res.render('index', {
    url,
  });
};

module.exports.getLoginPage = (req, res) => {
  console.log(userIN);
  res.status(200).render('login');
};

module.exports.getRegisterPage = (req, res) => {
  res.status(200).render('register');
};
