const express = require('express')
const app = express()
const PORT = 3000
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`listening on ${PORT}`)
})



//Connect to MongoDB
let dbConnectionStr = process.env.DB_STRING
    dbName = 'motivational'
    dbCollection = 'quotes'
//** */
MongoClient.connect(dbConnectionStr, 
{ useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to the ${dbName} Database`)
        const db = client.db(dbName)
        const quotesCollection = db.collection(dbCollection)
        
//Middleware
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

        // What this GET response does is take the parameters from the client-side JS file, and we would save the input into the url, where we would grab that input, and use it to search the database for whatever category, and then populate the EJS file with the findings... We would need some work done on the client-side JS done here.
        // app.get("/get/:quote", (req, res) => {
        //     const category = req.params.name.toLowerCase()
        //     let info = db.collection(dbCollection).find({"category": category}).toArray()
        //     res.render("index.ejs", {data: info})
        // })
        
        // Rendering EJS
    app.get('/', (req, res)=>{
    db.collection('quotes').find().toArray()
        .then(results=>{
            res.render('index.ejs', { quotes: results })
        })
        .catch(error=>console.error(error))
    
})

    })
    .catch(error => console.error(error))

