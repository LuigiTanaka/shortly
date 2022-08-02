import joi from "joi";

export default function validateSignIn(req, res, next) {
    const user = req.body;

    //validações com joi
    const userSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });

    const { error } = userSchema.validate(user, { abortEarly: false });

    if(error) {
        console.log(error);
        return res.status(422).send(error.details)
    }

    next();
}