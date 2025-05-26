const Joi = require('joi');

const validation = Joi.object({
    size_group_id: Joi.number().required(),
    sizes: Joi.array().min(1).items(Joi.string()).required()
})

const CreateSizeRequest = (req, res, next) => {
    const CreateSizeValidate = validation.validate(req.body, {
        abortEarly: false
    })

    if (CreateSizeValidate.error) {
        res.status(300)
            .json({
                status: 'invalidate',
                message: 'fields required',
                data: null,
                error: CreateSizeValidate.error.details.map(element => element.message)
            });

        return;
    }

    next();
}

module.exports = CreateSizeRequest;