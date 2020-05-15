// Import Environment Variables
require("dotenv").config()
const { NODE_ENV, CLIENT_ENDPOINT } = require("./config")

// Import Modules
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const helmet = require("helmet")

// Instantiate Express App
const app = express()

// Instantiate GraphQL Server
const graphqlHTTP = require('express-graphql');
const RootQuery = require("./schema/query.js");


// Setup Middleware
const morganOption = (NODE_ENV === "production")
  ? "tiny"
  : "common";

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
// const corsOptions = {
//   origin: CLIENT_ENDPOINT,
//   optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));
app.use("/graphql", graphqlHTTP({
  schema: RootQuery,
  graphiql: true,
}));


// Our production applications should hide error messages from users and other malicious parties
app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

// Routes
// app.get("/", (req, res) => {
//     res.send("Hello, world!")
// })

// Export app
module.exports = app