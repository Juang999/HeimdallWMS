const Joi = require('joi');

const validation = Joi.object({
    category_id: Joi.number().required(),
    sub_category_name: Joi.string().required()
})

const CreateSubCategoryRequest = (req, res, next) => {
    const CreateSubCategoryValidation = validation.validate(req.body, {
        abortEarly: false
    })

    if (CreateSubCategoryValidation.error) {
        res.status(300)
            .json({
                status: 'invalidate',
                message: 'field required',
                data: null,
                error: CreateSubCategoryValidation.error.details.map(element => element.message)
            });

        return;
    }

    next();
}

module.exports = CreateSubCategoryRequest;