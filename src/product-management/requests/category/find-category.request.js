const Joi = require('joi');

const validation = Joi.object({
    category_id: Joi.number().required()
})

const FindCategoryRequest = (req, res, next) => {
    const FindCategoryValidation = validation.validate(req.params, {
        abortEarly: false
    })

    if (FindCategoryValidation.error) {
        res.status(300)
            .json({
                status: 'invalidate',
                message: 'params required',
                data: null,
                error: FindCategoryValidation.error.details.map(element => element.message)
            });

        return;
    }

    next();
}

module.exports = FindCategoryRequest;