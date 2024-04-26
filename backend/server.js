// import required packages
const express = require('express')
require("dotenv").config()
const cors = require('cors')

// import router
const router = express.Router()

const ProcessImage = require('./process_image')

const upload = require("./config/multer")

// use the PORT in .env or 3000 if it does not exist
const port = process.env.PORT || 3000

// create express app
const app = express()

// use middleware to parse json
app.use(express.json())

// include Access-Control-Allow-Origin headers
app.use(cors())

// mount the router on the app
app.use('/', router);

// start app 
app.listen(port, () => console.log("Server started on port ", port))

// Routes
router.post('/upload', upload.single('file'), ProcessImage)