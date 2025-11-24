const Joi = require('joi');

const validation = Joi.object({
    brand_id: Joi.number().required(),
    category_id: Joi.number().required(),
    sub_category_id: Joi.number().required(),
    gender_id: Joi.number().required(),
    product_name: Joi.string().required(),
    description: Joi.string().required(),
    bulk_color_id: Joi.array().min(1).items(Joi.number()).required(),
    bulk_size_id: Joi.array().min(1).items(Joi.number()).required()
});

const CreateProductRequest = (req, res, next) => {
    const CreateProductValidate = validation.validate(req.body, {
        abortEarly: false
    })

    if (CreateProductValidate.error) {
        res.status(300)
            .json({
                status: 'invalidate',
                message: 'field required',
                data: null,
                error: CreateProductValidate.error.details.map(element => element.message)
            })

        return;
    }

    next();
}

module.exports = CreateProductRequest;