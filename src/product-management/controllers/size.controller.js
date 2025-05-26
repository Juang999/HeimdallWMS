const { createSize, findDataSizeBySizeGroup, findDataSizeById, updateSize, deleteSize } = require('../services/size.service');

class SizeController {
    createSize = (req, res) => {
        const body = req.body.sizes.map(element => {
            return {
                size_group_id: req.body.size_group_id,
                size_name: element
            }
        })

        createSize(body)
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'created',
                    data: result,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    message: 'error',
                    data: null,
                    error: err.message
                })
        })
    }

    findSize = (req, res) => {
        findDataSizeBySizeGroup(req.params.size_group_id)
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'ok',
                    data: result,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    message: 'error',
                    data: null,
                    error: err.message
                })
        })
    }

    updateSize = async (req, res) => {
        try {
            let dataSize = await findDataSizeById(req.params.size_id);

            if (!dataSize) {
                res.status(404)
                    .json({
                        status: 'rejected',
                        message: 'data doen\'t exist',
                        data: null,
                        error: 'rejected!'
                    });

                return;
            }

            let result = await updateSize(req.params.size_id, req.body, dataSize.dataValues);

            res.status(200)
                .json({
                    status: 'success',
                    message: 'updated',
                    data: result,
                    error: null
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    message: 'error',
                    data: null,
                    error: error.message
                })
        }
    }

    deleteSize = (req, res) => {
        deleteSize(req.params.size_id)
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'deleted',
                    data: result,
                    error: null
                })
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    message: 'error',
                    data: null,
                    error: err.message
                })
        })
    }
}

module.exports = new SizeController();