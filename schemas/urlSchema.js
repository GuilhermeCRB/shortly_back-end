import Joi from "joi";

const urlSchema = Joi.object({
    url: Joi.string().pattern(new RegExp('https?:\/\/')).required()
});

export default urlSchema;