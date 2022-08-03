import joi from "joi";

export default function validateSignUp(req, res, next) {
    const url = req.body;

    //validações com joi
    const urlSchema = joi.object({
        url: joi.string().pattern(/^https?:\/\//).required()
    });

    const { error } = urlSchema.validate(url, { abortEarly: false });

    if(error) {
        return res.status(422).send(error.details)
    }

    next();
}