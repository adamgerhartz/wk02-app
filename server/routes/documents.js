const express = require('express');
const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');

const router = express.Router();

// GET
router.get('/', (req, res, next) => {
  Document.find()
    .then(documents => {
      const updatedDocuments = [];
      for (let i = 0; i < documents.length; i++) {
        updatedDocuments.push({
          id: documents[i].id,
          name: documents[i].name,
          url: documents[i].url,
          description: documents[i].description,
          children: documents[i].children
        });
      }
      res.status(200).json({
        message: "Documents fetched successfully",
        documents: updatedDocuments
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
  const maxDocumentId = sequenceGenerator.nextId("documents");

  const document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  document.save()
    .then(createdDocument => {
      res.status(201).json({
        message: "Document added successfully",
        document: createdDocument
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "An error occured",
        error: error
      });
    })
});

// PUT
router.put('/:id', (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(document => {
      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;

      Document.updateOne({ id: req.params.id }, document)
        .then(result => {
          res.status(204).json({
            message: "Document updated successfully"
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
        message: "Document not found",
        error: { document: "Document not found" }
      });
    });
});

// DELETE
router.delete('/:id', (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(document => {
      Document.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Document deleted successfully"
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
        message: "Document not found",
        error: { document: "Document not found" }
      });
    });
});

module.exports = router;
