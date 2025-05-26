const Joi = require('joi');

const validation = Joi.object({
    sub_category_name: Joi.string().required(),
    sub_category_code: Joi.string().required()
})

const UpdateBodySubCategoryRequest = (req, res, next) => {
    const UpdateBodySubCategoryValidate = validation.validate(req.body, {
        abortEarly: false
    })

    if (UpdateBodySubCategoryValidate.error) {
        res.status(300)
            .json({
                status: 'invalidate',
                message: 'field required',
                data: null,
                error: UpdateBodySubCategoryValidate.error.details.map(element => element.message)
            })

        return;
    }

    next();
}

module.exports = UpdateBodySubCategoryRequest;