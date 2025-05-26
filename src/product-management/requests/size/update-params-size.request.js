const Joi = require('joi');

const validation = Joi.object({
    size_id: Joi.number().required()
})

const UpdateParamsSizeRequest = (req, res, next) => {
    const UpdateParamsSizeValidate = validation.validate(req.params, {
        abortEarly: false
    })

    if (UpdateParamsSizeValidate.error) {
        res.status(300)
            .json({
                status: 'invalidate',
                message: 'params required',
                data: null,
                error: UpdateParamsSizeValidate.error.details.map(element => element.message)
            })

        return;
    }

    next();
}

module.exports = UpdateParamsSizeRequest;