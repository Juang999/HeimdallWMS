const Joi = require('joi');

const validation = Joi.object({
    brand_id: Joi.number().required()
})

const CreateBrandRequest = (req, res, next) => {
    let createBrandValidate = validation.validate(req.params, {
        abortEarly: false
    });

    if (createBrandValidate.error) {
        let error = createBrandValidate.error.details.map(element => {
            return element.message
        });

        res.status(300)
            .json({
                status: 'invalidate',
                message: 'params required',
                data: null,
                error: error
            });
            
        return;
    }

    next();
}

module.exports = CreateBrandRequest;