// lets us create an Express Server in this file
    //creates a variable called 'express' that we can use throughout the file
const express = require('express')
    //creates a variable called 'app' that we can use throughout the file
const app = express()
//Initialize variable to hold require function for MongoDB
const MongoClient = require('mongodb').MongoClient


//creates a server that browsers can connect to that will serve necessary files & info
app.listen(3000, ()=>{
    console.log('listening on 3000')
})


//browsers perform a read/get operation when you visit a website
//app.get(valueAfterDomainName, callbackFunction)
//callback is what happens once the user enters the URL
//callback takes (request, response) arguments
app.get('/', (req, res)=>{
    //send the index.html file to the web browser from the server
    res.sendFile(__dirname + '/index.html')
})

//Connect to MongoDB
//get MongoDB connection string from Ryan
MongoClient.connect('mongodb-connection-string', 
{ useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        //initialize database name
        //get database name from Ryan
        const db = client.db('database-name')
        //initialize name of collection
        //get collection name from Ryan - quotes?
        const quotesCollection = db.collection('collection-name')

        // ** Ryan - set view engine to ejs (must be addeed before use, get, or post methods)


        app.use()

        // ** Pervais - get quotes from MongoDB (to be displayed on website)
        app.get()
        // ** Ryan/Pervais -  render index.ejs file, put quotes into index.ejs

        app.post()
        app.listen()
    })
    .catch(error => console.error(error))

