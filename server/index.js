const express = require("express");
const colors = require("colors");
const cors = require("cors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const port = process.env.PORT || 8000;

const app = express();

// Connect to database
connectDB();

const corsOptions = {
  origin: "",
};

app.use(cors(corsOptions));

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

app.use(
  "/graphql",
  cors({
    origin: "https://project-manager-frontend.onrender.com",
    credentials: true, //https://project-manager-frontend.onrender.com
  }),
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`Server running on port ${port}`));
