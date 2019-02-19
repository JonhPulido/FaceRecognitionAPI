const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const graphqlHTTP = require('express-graphql');


require('dotenv').config()
const formData = require('express-form-data')
const { CLIENT_ORIGIN } = require('./config')


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const imageUpload = require('./controllers/imageUpload');
const users= require('./controllers/users');
const schema = require('./controllers/schema');

const development = false;

const db = function(){
  if(!development){
    return  knex({
      client: 'pg',
      connection: {
        connectionString : process.env.DATABASE_URL,
        ssl: true,
      }
    })
  }
  return knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '123456',
      database : 'brain'
    }
  });
}();

const app = express();

app.use(bodyParser.json());
app.use(formData.parse());
app.use(cors({
  origin: CLIENT_ORIGIN 
}));
app.use('/graphql', graphqlHTTP({
  //Introduce a graphql schema here
  schema
}))



app.get('/', (req, res)=> { res.send("Succecsfull connection") }) 
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})
app.get('/images', (req, res) => {users.getImages(req, res, db)})
app.post('/image-save', (req, res) => {imageUpload.saveImage(req, res, db)})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/image-upload', (req, res) => {imageUpload.handleImageUpload(req,res,db)})

app.listen(process.env.PORT || 3000, ()=> {
  console.log('app is running on port 3000');
})



