require("dotenv").config();
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const port = process.env.PORT || 8000;

const app = express();

// Connect to database
connectDB();

// Handle options credentials check - before CORS!
app.use(credentials);

app.use(cors(corsOptions));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`Server running on port ${port}`));
