import joi from "joi";

export default function validateSignUp(req, res, next) {
    const newUser = req.body;

    //verifica se senhas iguais
    if(newUser.password !== newUser.confirmPassword) {
        return res.status(422).send("senhas não compatíveis")
    }

    //validações com joi
    const userSchema = joi.object({
        name: joi.string().trim().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        confirmPassword: joi.string().required()
    });

    const { error } = userSchema.validate(newUser, { abortEarly: false });

    if(error) {
        console.log(error);
        return res.status(422).send(error.details)
    }

    next();
}