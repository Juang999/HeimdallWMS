const Joi = require('joi');

const validation = Joi.object({
    brand_name: Joi.string().required(),
    brand_code: Joi.string().min(3).max(3).required()
})

const UpdateBodyBrandRequest = (req, res, next) => {
    let updateBodyBrandValidate = validation.validate(req.body, {
        abortEarly: false
    });

    if (updateBodyBrandValidate.error) {
        let error = updateBodyBrandValidate.error.details.map(element => {
            return element.message
        });

        res.status(300)
            .json({
                status: 'failed',
                message: 'field required',
                data: null,
                error: error
            });
            
        return;
    }

    next();
}

module.exports = UpdateBodyBrandRequest;