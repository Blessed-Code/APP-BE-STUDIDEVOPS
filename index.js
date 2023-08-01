require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const port = 3000;

// App
const app = express();

// Morgan
app.use(morgan("tiny"));

// First route
app.get("/", (req, res) => {
    res.json({ message: "Hello world!" });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})