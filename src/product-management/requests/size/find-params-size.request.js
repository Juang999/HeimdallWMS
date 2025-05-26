const Joi = require('joi');

const validation = Joi.object({
    size_group_id: Joi.number().required()
})

const FindParamsSizeRequest = (req, res, next) => {
    const FindParamsSizeValidate = validation.validate(req.params, {
        abortEarly: false
    });

    if (FindParamsSizeValidate.error) {
        res.status(300)
            .json({
                status: 'invalidate',
                message: 'params required',
                data: null,
                error: FindParamsSizeValidate.error.details.map(element => element.message)
            })

        return;
    }

    next();
}

module.exports = FindParamsSizeRequest;