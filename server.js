// lets us create an Express Server in this file
const express = require('express')
//creates a variable called 'app' that we can use throughout the file
const app = express()
//Variable for PORT
const PORT = 3000
//Initialize variable to hold require function for MongoDB
const MongoClient = require('mongodb').MongoClient
//Initialize dotenv
require('dotenv').config()


//creates a server that browsers can connect to that will serve necessary files & info
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`listening on ${PORT}`)
})


//browsers perform a read/get operation when you visit a website
//app.get(valueAfterDomainName, callbackFunction)
//callback is what happens once the user enters the URL
//callback takes (request, response) arguments
app.get('/', (req, res)=>{
    //send the index.html file to the web browser from the server when arriving at homepage
    res.sendFile(__dirname + '/index.html')
})

//Connect to MongoDB
let dbConnectionStr = process.env.DB_STRING
    dbName = 'motivational'
    dbCollection = 'quotes'
//get MongoDB connection string from Ryan ^^
MongoClient.connect(dbConnectionStr, 
{ useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to the ${dbName} Database`)
        //initialize database name
        //get database name from Ryan
        const db = client.db(dbName)
        //initialize name of collection
        //get collection name from Ryan - quotes?
        const quotesCollection = db.collection(dbCollection)

        // ** Ryan - set view engine to ejs (must be addeed before use, get, or post methods)
        
        // app.set('view engine', 'ejs')

        app.use()

        // ** Pervais - get quotes from MongoDB (to be displayed on website)
        app.get()
        // ** Ryan/Pervais -  render index.ejs file, put quotes into index.ejs

        app.post()
        app.listen()
    })
    .catch(error => console.error(error))

