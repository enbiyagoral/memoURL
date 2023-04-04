const Url = require('../model/Url');

module.exports.createUrl = async (req, res) => {
  const url = await Url.create({
    name: req.body.name,
    description: req.body.description,
    user: req.session.userID,
  });

  res.status(201).redirect('/');
};

module.exports.getUrl = async (req, res) => {
  const url = await Url.findOne({ _id: req.params.id });
  res.render('url-details', {
    url,
  });
};

module.exports.updateUrl = async (req, res) => {
  const url = await Url.findById(req.params.id);
  url.name = req.body.name;
  url.description = req.body.description;
  url.save();
  res.redirect('/');
};
module.exports.deleteUrl = async (req, res) => {
  const url = await Url.findOneAndRemove({ _id: req.params.id });
  res.redirect('/');
};
