const express = require("express");
const Message = require("../models/message");

const msg_index = (req, res) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return date.toLocaleDateString("en-GB", options);
    };
  
    Message.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        const formattedMessages = result.map((message) => ({
          ...message._doc,
          formattedDate: formatDate(message.createdAt),
        }));
        res.render("index", { messages: formattedMessages, title: "Message Board" });
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
