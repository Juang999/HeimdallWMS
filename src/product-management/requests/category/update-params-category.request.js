const Joi = require('joi');

const validation = Joi.object({
    category_id: Joi.number().required()
})

const UpdateParamsCategoryRequest = (req, res, next) => {
    let UpdateParamsCategoryValidate = validation.validate(req.params, {
        abortEarly: false
    })

    if (UpdateParamsCategoryValidate.error) {
        res.status(300)
            .json({
                status: 'invalidate',
                message: 'body required',
                data: null,
                error: UpdateParamsCategoryValidate.error.details.map(element => element.message)
            })

        return;
    }

    next();
}

module.exports = UpdateParamsCategoryRequest;