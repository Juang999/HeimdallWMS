const Joi = require('joi');

const validation = Joi.object({
    brand_name: Joi.string().required()
})

const CreateBrandRequest = (req, res, next) => {
    let createBrandValidate = validation.validate(req.body, {
        abortEarly: false
    });

    if (createBrandValidate.error) {
        let error = createBrandValidate.error.details.map(element => {
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

module.exports = CreateBrandRequest;