const getImages = (req, res, db) => {
  const { id } = req.body;
  db('images')
  .then(images => {
    res.json(images)
  })
  .catch(err => res.status(400).json('unable to get entries'))
}
  
  module.exports = {
    getImages
  }