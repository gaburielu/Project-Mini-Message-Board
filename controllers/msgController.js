const express = require("express");
const Message = require("../models/message");

const msg_index = (req, res) => {
    Message.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        res.render("index", { messages: result, title: "Message Board" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const msg_create_get = (req, res) => {
    res.render("new", { title: "Create a new blog" });
  };

  const msg_create_post = (req, res) => {
    const msg = new Message(req.body);
  
    msg
      .save()
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };



module.exports = {
    msg_index,
    msg_create_get,
    msg_create_post,
};
