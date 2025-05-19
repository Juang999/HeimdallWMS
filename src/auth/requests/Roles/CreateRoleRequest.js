const Joi = require('joi')

const validation = Joi.object({
    role_name: Joi.string().required(),
    features: Joi.array().min(1).required().items(Joi.object({
        feature_id: Joi.number().required(),
        sub_features: Joi.array().min(1).required().items(Joi.object({
            sub_feature_id: Joi.number().required(),
            accesses: Joi.array().min(1).required().items(Joi.object({
                access_id: Joi.number().required()
            }))
        }))
    }))
});

const CreateRoleRequest = (req, res, next) => {
    let createRoleValidate = validation.validate(req.body, {
        abortEarly: false
    });

    if (createRoleValidate.error) {
        let error = createRoleValidate.error.details.map(element => {
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

module.exports = CreateRoleRequest;