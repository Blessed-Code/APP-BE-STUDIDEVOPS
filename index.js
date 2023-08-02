require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const port = 3000;

// App
const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/index.route"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});