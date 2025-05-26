const Joi = require('joi');

const validation = Joi.object({
    category_name: Joi.string().required(),
    category_code: Joi.string().required()
})

const UpdateBodyCategoryRequest = (req, res, next) => {
    const UpdateBodyCategoryValidation = validation.validate(req.body, {
        abortEarly: false
    })

    if (UpdateBodyCategoryValidation.error) {
        res.status(300)
            .json({
                status: 'invalidate',
                message: 'field required',
                data: null,
                error: UpdateBodyCategoryValidation.error.details.map(element => element.message)
            })

        return;
    }

    next();
} 

module.exports = UpdateBodyCategoryRequest;