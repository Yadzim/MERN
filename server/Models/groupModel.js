const Joi = require( "joi" );
const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: String,
  description: String,
  count: Number,
});

const GroupModel = mongoose.model("Group", GroupSchema);

const groupValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .max(36)
      .pattern(new RegExp("^[a-zA-Z1-9]")),
    description: Joi.string().min(3).max(90),
    count: Joi.number(),
  });

  return schema.validate(data);
};

module.exports = {GroupModel, groupValidation}