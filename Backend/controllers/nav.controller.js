const frontendData = require("../dataModels/frontendDatas");

exports.getNavItems = (req, res) => {
  res.status(200).json(frontendData.navBar);
};
