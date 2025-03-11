import Joi from "joi"

export function taskValidator(req, res, next) {
    const taskSchema = Joi.object({
        text: Joi.string().min(1).max(40).required()
    })

    const { error } = taskSchema.validate(req.body, {
        allowUnknown: false,
        abortEarly: false
    })

    req.textValid = !error

    next()
}