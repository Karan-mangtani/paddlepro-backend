const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const contactUsrouter = require("./routes/contactUs");
const registrationsRouter = require("./routes/registrations");
const app = express();

const url = "mongodb+srv://root:root@cluster0.jigja.mongodb.net/paddlepro?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
app.use(bodyParser.json());
try {
  con.on("open", () => {
    console.log("connected");
  });
} catch (error) {
  console.log("Error: " + error);
}

const port = process.env.PORT || 9000;
app.use("/contact-us", contactUsrouter);
app.use("/registrations", registrationsRouter);
app.listen(port, () => {
  console.log("Server started", port);
});
