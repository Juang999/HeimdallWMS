const Joi = require('joi');

const validation = Joi.object({
    warehouse_id: Joi.number().required(),
    detail_product_id: Joi.number().required(),
    quantity: Joi.number().required(),
})

const InboundInventoryRequest = (req, res, next) => {
    const InboundInventoryValidate = validation.validate(req.body, {
        abortEarly: false,
    })

    if (InboundInventoryValidate.error) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid request data',
            errors: InboundInventoryValidate.error.details.map(err => err.message),
        });

        return;
    }

    next();
}

module.exports = InboundInventoryRequest;