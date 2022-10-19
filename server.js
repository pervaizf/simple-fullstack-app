const express = require('express')
const app = express()
const PORT = 3000
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

//Connect to MongoDB

let db,
  dbConnectionStr = process.env.DB_STRING
dbName = 'motivational'
dbCollection = 'quotes'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to the ${dbName} Database`)
    db = client.db(dbName)
  }
)

//Middleware

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Homepage

app.get('/', async (req, res) => {
  try {
    const data = await db
      .collection(dbCollection)
      .aggregate([{ $sample: { size: 1 } }])
      .toArray()
    res.render(`index.ejs`, { info: data })
  } catch (err) {
    console.error(err)
    res.render('error/404')
  }
})

// 'Admin Page'

app.get('/page-for-adding-and-changing', (req, res) => {
  db.collection(dbCollection)
    .find()
    .sort({ likes: -1 })
    .toArray()
    .then((data) => {
      res.render('admin.ejs', { info: data })
    })
    .catch((error) => console.error(error))
})

// Page for each category - Working out a better way to send the 404...

app.get('/:category', async (req, res) => {
  try {
    const category = req.params.category
    const data = await db
      .collection(dbCollection)
      .aggregate([
        { $match: { category: `${category}` } },
        { $sample: { size: 1 } },
      ])
      .toArray()
    if (data.length === 0) {
      return res.status(404).render('error/404')
    }
    res.render(`${category}.ejs`, { info: data })
  } catch (err) {
    console.error(err)
  }
})

// TO EDIT THE DATABASE

app.post('/addQuote', (req, res) => {
  db.collection(dbCollection)
    .insertOne({
      quote: req.body.quote,
      author: req.body.author,
      category: req.body.category,
      likes: 0,
    })
    .then((result) => {
      console.log('Motivation Added')
      res.redirect('/page-for-adding-and-changing')
    })
    .catch((error) => console.error(error))
})

app.put('/addOneLike', (req, res) => {
  db.collection(dbCollection)
    .updateOne(
      {
        quote: req.body.quoteS,
        author: req.body.authorS,
        category: req.body.categoryS,
        likes: req.body.likesS,
      },
      {
        $set: {
          likes: req.body.likesS + 1,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true,
      }
    )
    .then((result) => {
      console.log('Added One Like')
      res.json('Like Added')
    })
    .catch((error) => console.error(error))
})

app.delete('/deleteQuote', (req, res) => {
  console.log(req.body)
  db.collection(dbCollection)
    .deleteOne(req.body)
    .then((result) => {
      console.log('Quote Deleted')
      res.json('Quote Deleted')
    })
    .catch((error) => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`listening on ${PORT}`)
})
