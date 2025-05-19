const Joi = require('joi');

const validation = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

const LoginRequest = (req, res, next) => {
    let loginValidate = validation.validate(req.body, {
        abortEarly: false
    })

    if (loginValidate.error) {
        let error = loginValidate.error.details.map(element => {
            return element.message
        })

        res.status(300)
            .json({
                status: 'failed',
                message: 'field required',
                data: null,
                error: error
            })

        return;
    }

    next();
}

module.exports = LoginRequest;