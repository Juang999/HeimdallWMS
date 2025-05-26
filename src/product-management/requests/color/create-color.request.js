const Joi = require('joi');

const validation = Joi.object({
    color_name: Joi.string().required(),
    hex_code: Joi.string().required()
})

const CreateColorRequest = (req, res, next) => {
    const CreateColorValidate = validation.validate(req.body, {
        abortEarly: false
    })

    if (CreateColorValidate.error) {
        res.status(300)
            .json({
                status: 'invalidate',
                message: 'field required',
                data: null,
                error: CreateColorValidate.error.details.map(element => element.message)
            })

        return;
    }

    next();
}

module.exports = CreateColorRequest;