const Joi = require( "joi" );
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  username: {
    type: String,
    required: true,
    // min: 10, //type: number
    // max: 300, //type: number
    // minlength: 3 //chart length
    // required: () => this.name?.length === 3
    // enum: ["azizxon", "abror"] //only this words
    // validate: {
    //   isAsync: true,
    //   validator: (val, calback) => { calback(val && val?.length > 0) },
    //   message: "Username uzunligi 3 dan ko'p bo'lishi kerak"
    // }
    // lowercase: true // auto write lowercase
    // trim: true
   },
  email: String,
  group_id: String,
});

const UserModel = mongoose.model("User", UserSchema);

const userValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .max(36)
      .pattern(new RegExp("^[a-zA-Z]")),
    username: Joi.string().required().min(3).max(36),
    email: Joi.string()
      .required()
      .min(3)
      .max(36)
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "uz", "org"] },
      }),
    group_id: Joi.string(),
  });

  return schema.validate(data);
};


module.exports = {UserModel, userValidation}