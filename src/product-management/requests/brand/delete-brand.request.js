const Joi = require('joi');

const validation = Joi.object({
    brand_id: Joi.number().required()
})

const DeleteBrandRequest = (req, res, next) => {
    let deleteBrandValidate = validation.validate(req.params, {
        abortEarly: false
    })

    if (deleteBrandValidate.error) {
        let error = deleteBrandValidate.error.details.map(element => {
            return element.message
        });

        res.status(300)
            .json({
                status: 'failed',
                message: 'parameter required',
                data: null,
                error: error
            });

        return;
    }

    next();
}

module.exports = DeleteBrandRequest;