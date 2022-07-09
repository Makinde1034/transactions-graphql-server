const express = require("express")
const graphql = require("graphql")
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema} = graphql
const {graphqlHTTP} = require("express-graphql")
const transcations = require("./db")

const app = express()

const transactionType = new GraphQLObjectType({
    name : "Transaction",
    fields : () => ({
        id : {type : GraphQLInt},
        title : {type : GraphQLString},
        amount : {type : GraphQLInt},
        type : {type : GraphQLString},
        date : {type : GraphQLString},
        status : {type : GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name : "RootQuertType",
    fields:{
        getAllUsers:{
            type : new GraphQLList(transactionType),
            args : { id : {type : GraphQLInt}},
            resolve(parent,args){
                return transcations
            }
        }
    }
})


const schema = new  GraphQLSchema({query:RootQuery})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql : true
}))

app.get("/",(re,res)=>{
    res.json({ello:"djdjd"})
})

app.listen(3000,()=>{
    console.log("Listening on port 3000")
})