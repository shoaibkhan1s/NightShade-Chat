const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const method_override = require("method-override");
const ExpressError = require("./utils/ExpressErrorHandler");
const cors = require("cors");

dotenv.config({
  path: "./.env",
});
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: process.env.CORT_ORIGIN,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(method_override("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const currUser = "Shoaib";
const currReciever = "Kevin";

let messages = [];

app.get("/", (req, res) => {
  res.render("index", { messages: messages, user: currUser });
});

app.post("/messages", (req, res, next) => {
  const { sentFrom, sentTo, message } = req.body;
  if (sentFrom == sentTo) {
    res.status(400).send("You can not send message to yourself");
  } else {
    messages.push({
      sentFrom,
      sentTo,
      message,
      instance: new Date(),
    });

    res.redirect("/");
  }
});

app.get("/message/:id/edit", (req, res) => {
  const msgIndex = req.params.id;
  const msg = messages[msgIndex];

  if (!msg) {
    next(new ExpressError(404, "Message not found"));
  } else {
    res.render("message", { msg, msgIndex, user: currUser });
  }
});

app.patch("/message/:id", (req, res, next) => {
  const msgIndex = req.params.id;
  let msg = messages[msgIndex];

  if (!msg) {
    return next(new ExpressError(404, "Message not found"));
  }

  msg.message = req.body.msg;
  res.redirect("/");
});

app.delete("/message/:id", (req, res, next) => {
  const msgIndex = req.params.id;
  messages.splice(msgIndex, 1);
  res.redirect("/");
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  console.log("Errors : ", err);
  let { status = 500, message = "Some Error Occurred" } = err;
  res.status(status).send(message);
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
