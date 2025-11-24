const Joi = require('joi');

const validation = Joi.object({
    warehouse_name: Joi.string().required()
});

const CreateWarehouseRequest = (req, res, next) => {
    const CreateWarehouseValidate = validation.validate(req.body, {
        abortEarly: false
    })

    if (CreateWarehouseValidate.error) {
        res.status(300)
            .json({
                status: 'failed',
                message: 'parameter required',
                data: null,
                error: CreateWarehouseValidate.error.details.map(element => {
                    return element.message;
                })
            });

        return;
    }

    next();
}

module.exports = CreateWarehouseRequest;