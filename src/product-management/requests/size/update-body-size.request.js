const Joi = require('joi');

const validation = Joi.object({
    size_name: Joi.string(),
    size_group_id: Joi.number()
})

const UpdateBodySizeRequest = (req, res, next) => {
    const UpdateBodySizeValidate = validation.validate(req.body, {
        abortEarly: false
    })

    if (UpdateBodySizeValidate.error) {
        res.status(300)
            .json({
                status: 'invalidate',
                message: 'bodies required',
                data: null,
                error: UpdateBodySizeValidate.error.details.map(element => element.message)
            })

        return;
    }

    next();
}

module.exports = UpdateBodySizeRequest;