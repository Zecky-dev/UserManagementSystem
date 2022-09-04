// Packages
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

// Express app
const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Static files
app.use(express.static("public"));

// Routes
const routes = require('./server/routes/routes.js');
app.use('/',routes);


// View Engine
app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
