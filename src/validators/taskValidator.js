import Joi from "joi";

export function taskValidator(req, res, next) {
    const taskSchema = Joi.object({
        text: Joi.string().min(1).max(40).required()
    });

    const { error } = taskSchema.validate(req.body, {
        allowUnknown: false,
        abortEarly: false
    });

    if (error) {
        return res.json({ errors: error.details.map(itm => itm.message) });
    }

    req.textValid = !error

    next();
}