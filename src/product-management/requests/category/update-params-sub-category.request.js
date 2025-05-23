const Joi = require('joi');

const validation = Joi.object({
    sub_category_id: Joi.number().required()
})

const UpdateParamsSubCategoryRequest = (req, res, next) => {
    const UpdateParamsSubCategoryValidate = validation.validate(req.params, {
        abortEarly: false
    })

    if (UpdateParamsSubCategoryValidate.error) {
        res.status(300)
            .json({
                status: 'invalidate',
                message: 'params required',
                data: null,
                error: UpdateParamsSubCategoryValidate.error.details.map(element => element.message)
            });

        return;
    }

    next();
}

module.exports = UpdateParamsSubCategoryRequest;