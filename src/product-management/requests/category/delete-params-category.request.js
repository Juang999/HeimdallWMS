const Joi = require('joi')

const validation = Joi.object({
    category_id: Joi.number().required()
})

const DeleteParamsCategoryRequest = (req, res, next) => {
    const DeleteParamsCategoryValidate = validation.validate(req.params, {
        abortEarly: false
    })

    if (DeleteParamsCategoryValidate.error) {
        res.status(300)
            .json({
                status: 'invalidate',
                message: 'field required',
                data: null,
                error: DeleteParamsCategoryValidate.error.details.map(element => element.message)
            })

        return;
    }

    next();
}

module.exports = DeleteParamsCategoryRequest;