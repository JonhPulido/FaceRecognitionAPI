const graphql = require ('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList} = graphql
const fetch = require('node-fetch');
const _ = require('lodash');

const imageType = new GraphQLObjectType({
    name: 'image', 
    fields:()=>({
        id: {
                type : GraphQLInt,
                resolve: json =>json[0].id
        },
        url: {
                type : GraphQLString,
                resolve: json => json[0].image_url

            },
        users_id: {
                type : GraphQLInt,
                resolve: json => json[0].users_id
            }
    }),
})

const userType = new GraphQLObjectType({
    name: 'user', 
    fields:()=>({
        id: {
                type : GraphQLInt,
                resolve: json =>json[0].id
        },
        name: {
                type : GraphQLString,
                resolve: json =>json[0].name
            },
        email: {
                type : GraphQLInt,
                resolve: json =>json[0].email
            },
        images : {
            type : imageType,
            resolve : (parent,args)=>fetch('https://facer-recognition.herokuapp.com/images')
            .then(res => res.json())
            .then(imagesArray => {
                console.log(parent)
                return imagesArray
            })  

        }
    }),
})



const RootQuery = new GraphQLObjectType({
    name: 'RootQUeryType',
    fields: {
        images:{
            type: imageType,
            args: {id : {type : GraphQLInt} },
            resolve : (parent,args)=>fetch('https://facer-recognition.herokuapp.com/images')
                        .then(res => res.json())
                        .then(imagesArray =>  imagesArray)     
        },
        users:{
            type : userType,
            args: {id : {type : GraphQLInt} },
            resolve :  (parent,args)=>fetch('https://facer-recognition.herokuapp.com/users')
            .then(res => res.json())
            .then(usersArray =>  usersArray)

        }
    }

})
module.exports = new GraphQLSchema({
    query: RootQuery,
})