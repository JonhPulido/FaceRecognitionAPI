const cloudinary = require('cloudinary')

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
})


const handleImageUpload = (req,res,db) => {
  const values = Object.values(req.files)
  if (!values) {
    return res.status(400).json('Canot get image');
  }
  const promises = values.map(image =>cloudinary.uploader.upload(image.path))
  Promise
    .all(promises)
    .then(results => res.json(results))
    .catch((err) => res.status(400).json(err))
  }

const saveImage = (req, res, db) => {
  const {id, image_url} = req.body;
  db.transaction(trx => {
    trx.insert({
      image_url ,
      users_id : id,
      uploaded: new Date(),
    })
    .into('images')
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json(err))
}
  
  module.exports = {
    saveImage,
    handleImageUpload
  }