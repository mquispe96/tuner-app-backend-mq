const requiredFields = (req, res, next) => {
  const {name, artist, is_favorite} = req.body;
  if (!name) {
    res.status(400).json({error: 'missing song name'});
  } else if (!artist) {
    res.status(400).json({error: 'missing artist name'});
  } else if (is_favorite !== 'true' && is_favorite !== 'false') {
    res.status(400).json({error: 'is_favorite field needs to be true/false'});
  } else {
    next();
  }
};

module.exports = {requiredFields};
