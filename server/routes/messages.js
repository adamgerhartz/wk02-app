const express = require('express');
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');
const Contact = require('../models/contact');

const router = express.Router();

// GET
router.get('/', (req, res, next) => {

  Message.find()
    .populate('sender')
    .then(messages => {
      const updatedMessages = [];
      for (let i = 0; i < messages.length; i++) {
        updatedMessages.push({
          id: messages[i].id,
          subject: messages[i].subject,
          msgText: messages[i].msgText,
          sender: messages[i].sender.id
        });
      }
      console.log(updatedMessages)
      res.status(200).json({
        message: "Messages fetched successfully",
        messages: updatedMessages
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "An error occured",
        error: error
      });
    });
});

// POST
router.post('/', (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: null
  });

  Contact.findOne({id:req.body.sender}, function(err, contact) {
    message.sender = contact._id;

    message.save()
      .then(createdMessage => {
        res.status(201).json({
          message: "Message added successfully",
          newMessageFromDB: {
            id: createdMessage.id,
            subject: createdMessage.subject,
            msgText: createdMessage.msgText,
            sender: req.body.sender
          }
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "An error occured",
          error: error
        });
      })
  });
});

// PUT
router.put('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;

      Message.updateOne({ id: req.params.id }, message)
        .then(result => {
          res.status(204).json({
            message: "Message updated successfully"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: "An error occured",
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: "Message not found",
        error: { message: "Message not found" }
      });
    });
});

// DELETE
router.delete('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
      Message.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Message deleted successfully"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: "An error occured",
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: "Message not found",
        error: { message: "Message not found" }
      });
    });
});

module.exports = router;
