require("dotenv").config();
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const path = require("path");
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

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(port, console.log(`Server running on port ${port}`));
