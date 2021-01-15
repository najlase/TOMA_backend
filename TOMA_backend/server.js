const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require('cors');

const app = express()
const router = require("./src/api/router")
const port = 3000

const authRouter = require("./src/auth/router")

// Connect to DB
const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb+srv://user:user@cluster0.dmbnx.mongodb.net/<dbname>?retryWrites=true&w=majority', options)

mongoose.connection.on('connected', function () {
  console.log('Database connection established!')
}) 

mongoose.connection.on('error',function (err) { 
  console.log('Database connection connection error: ' + err)
}) 

mongoose.connection.on('disconnected', function () { 
  console.log('Database disconnected')
})

app.use("/api", authRouter)
app.use("/api", router)

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
