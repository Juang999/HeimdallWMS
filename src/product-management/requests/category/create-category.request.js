const Joi = require('joi');

const validation = Joi.object({
    category_name: Joi.string().required(),
    sub_categories: Joi.array().min(1).required().items(Joi.object({
        sub_category_name: Joi.string().required()
    }))
})

const CreateCategoryRequest = (req, res, next) => {
    let createCategoryValidate = validation.validate(req.body, {
        abortEarly: false
    })

    if (createCategoryValidate.error) {
        let error = createCategoryValidate.error.details.map(element => {
            return element.message
        })

        res.status(300)
            .json({
                status: 'failed',
                message: 'field required',
                data: null,
                error
            });

        return;
    }

    next();
}

module.exports = CreateCategoryRequest;