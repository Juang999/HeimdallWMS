const Joi = require('joi');

const validation = Joi.object({
    sub_category_id: Joi.number().required()
})

const DeleteParamsSubCategoryRequest = (req, res, next) => {
    const DeleteParamsSubCategoryValidate = validation.validate(req.params, {
        abortEarly: false
    })

    if (DeleteParamsSubCategoryValidate.error) {
        res.status(300)
            .json({
                status: 'invalidate',
                message: 'params required',
                data: null,
                error: DeleteParamsSubCategoryValidate.error.details.map(element => element.message)
            });

        return;
    }

    next();
}

module.exports = DeleteParamsSubCategoryRequest;