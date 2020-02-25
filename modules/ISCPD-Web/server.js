const path = require("path");
const express = require("express");
const app = express();

app.use(express.static("./public"));

app.get("/", (req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, "./public/index_old2.html"));
});

app.listen(9000);
