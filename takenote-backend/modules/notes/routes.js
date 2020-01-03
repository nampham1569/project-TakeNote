const express = require("express");
const joi = require("@hapi/joi");
const NoteModel = require("./model");

const noteRouter = express.Router();

noteRouter.post("/", (req, res) => {
  if (!req.session.currentUser) {
    console.log("nothing");
    res.status(401).json({
      success: false,
      message: "Unauthenticated"
    });
  } else {
    console.log("okay");
    res.status(401).json({
      success: true,
      data: {
        _id: req.session.currentUser._id,
        email: req.session.currentUser.email,
        firstName: req.session.currentUser.firstName,
        lastName: req.session.currentUser.lastName
      },
      message: "Authenticated"
    });
  }
});

noteRouter.post("/create-note", async (req, res) => {
  const bodyValidation = joi.object({
    content: joi
      .string()
      .required()
      .min(1)
      .max(10000)
      .error(() => {
        return new Error("Note contains at least 1 characters");
      }),
    author: joi.string()
  });
  const validateResult = bodyValidation.validate(req.body);
  if (validateResult.error) {
    res.status(400).json({
      success: false,
      message: validateResult.error.message
    });
  } else {
    // save db
    const newNoteInfo = {
      content: req.body.content,
      author: req.body.author
    };
    const newNote = await NoteModel.create(newNoteInfo);
    res.status(201).json({
      success: true,
      data: newNote
    });
  }
});

noteRouter.get("/get-notes", async (req, res) => {
  try {
    let mongoose = require("mongoose");
    let id = new mongoose.Types.ObjectId(req.session.currentUser._id);
    const data = await NoteModel.find({
      author: { _id: id }
    })
      .populate("author", "_id")
      .sort({ updatedAt: "descending" })
      .lean();
    res.status(200).json({
      success: true,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

noteRouter.post("/edit-note", async (req, res) => {
  try {
    let mongoose = require("mongoose");
    let id = new mongoose.Types.ObjectId(req.body.noteId);
    console.log(id);
    console.log(req.body.noteId);
    const data = await NoteModel.findByIdAndUpdate(id, {
      content: req.body.content
    }).lean();
    console.log(data);
    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = noteRouter;
