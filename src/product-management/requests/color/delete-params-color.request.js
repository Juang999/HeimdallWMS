const Joi = require('joi');

const validation = Joi.object({
    color_id: Joi.number().required()
})

const DeleteParamsColorRequest = (req, res, next) => {
    const DeleteParamsColorValidate = validation.validate(req.params, {
        abortEarly: false
    })

    if (DeleteParamsColorValidate.error) {
        res.status(300)
            .json({
                status: 'invalidate',
                message: 'params required',
                data: null,
                error: DeleteParamsColorValidate.error.details.map(element => element.message)
            })

        return;
    }

    next();
}

module.exports = DeleteParamsColorRequest;