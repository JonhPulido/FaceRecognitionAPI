const graphql = require ('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLSchema,GraphQLInt} = graphql

const imageType = new GraphQLObjectType({
    name: 'image', 
    fields:()=>({
        id: {type : GraphQLInt},
        url: {type : GraphQLString},
        id: {type : GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQUeryType',
    fields: {
        book:{
            type: imageType,
            args: {id : {type : GraphQLInt} },
            resolve(parent,args){
                //Code to get data from db or API

            }
        }
    }

})

module.exports = new GraphQLSchema({
    query: RootQuery,
})