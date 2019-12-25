const express = require("express");
const joi = require("@hapi/joi");
const bcryptjs = require("bcryptjs");
const UsersModel = require("../users/model");

//router
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  //validate
  const bodyValidation = joi.object({
    email: joi
      .string()
      .required()
      .pattern(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      )
      .error(() => {
        return new Error("Invalid email address");
      }),
    password: joi
      .string()
      .required()
      .pattern(/^[a-zA-Z0-9]{6,30}$/)
      .error(() => {
        return new Error(
          "Passsword only allow alphanumeric, at least 6 characters"
        );
      }),
    firstName: joi
      .string()
      .required()
      .max(100)
      .error(() => {
        return new Error("Firstname cannot be over 100 characters");
      }),
    lastName: joi
      .string()
      .required()
      .max(100)
      .error(() => {
        return new Error("Lastname cannot be over 100 characters");
      })
  });
  const validateResult = bodyValidation.validate(req.body);
  if (validateResult.error) {
    res.status(400).json({
      success: false,
      message: validateResult.error.message
    });
  } else {
    const existedEmail = await UsersModel.findOne({
      email: req.body.email
    }).lean();
    if (existedEmail) {
      res.status(400).json({
        success: false,
        message: "Email has been used"
      });
    } else {
      //hash password
      const hashPassword = bcryptjs.hashSync(req.body.password);
      //save to db
      const newUser = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashPassword
      };
      await UsersModel.create(newUser, (err, user) => {
        req.session.currentUser = {
          _id: user._id,
          email: user.email
        };
        req.session.save();
      });
      res.status(200).json({
        success: true
      });
    }
  }
});

module.exports = authRouter;
