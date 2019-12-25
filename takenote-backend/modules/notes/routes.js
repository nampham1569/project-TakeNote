const express = require("express");

const noteRouter = express.Router();

noteRouter.post("/", (req, res) => {
  if (!req.session.currentUser) {
    console.log("nothing");
    res.status(401).json({
      success: false,
      message: "Unauthenticated"
    });
  }
});

module.exports = noteRouter;
