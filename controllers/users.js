const getUsers = (req, res, db) => {
    db('users')
    .then(users => {
      res.json(users)
    })
    .catch(err => res.status(400).json('unable to get entries'))
  }
    
    module.exports = {
      getUsers
    }