const { retrieveBrand, createBrand, deleteBrand, updateBrand, findDataBrand } = require('../services/brand.service');
const path = require('path');

class BrandController {
    getDataBrand = (req, res) => {
        retrieveBrand()
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'ok',
                    data: result,
                    error: null
                });
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    message: 'error',
                    data: null,
                    error: err.message
                });
        })
    }

    createBrand = (req, res) => {
        const uploadedImage = this.uploadImage(req.files.file);

        createBrand(req.body.brand_name, req.body.brand_code, uploadedImage)
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'brand created!',
                    data: result,
                    error: null
                });
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    message: 'error',
                    data: null,
                    error: err.message
                });
        })
    }

    deleteBrand = (req, res) => {
        deleteBrand(req.params.brand_id)
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'deleted!',
                    data: result,
                    error: null
                });
        })
        .catch(err => {
            res.status(400)
                .json({
                    status: 'failed',
                    message: 'error',
                    data: null,
                    error: err.message
                });
        })
    }

    updateBrand = async (req, res) => {
        try {
            let dataBrand = await findDataBrand(req.params.brand_id);

            if (!dataBrand) {
                res.status(404)
                    .json({
                        status: 'not found!',
                        message: 'not found!',
                        data: null,
                        error: 'not found!'
                    });

                return;
            }

            let result = await updateBrand(req.params.brand_id, req.body.brand_name, req.body.brand_code);

            res.status(200)
                .json({
                    status: 'success',
                    message: 'updated!',
                    data: result,
                    error: null
                });
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    message: 'error',
                    data: null,
                    error: error.message
                });
        }
    }

    uploadImage = (file) => {
        const pathFolder = path.join(__dirname, '..', '..', '..', 'public', 'images', 'brands');
        const fileName = Date.now() + '-' + file.name;
        const filePath = path.join('images', 'brands', fileName);

        const resultPathFolder = path.join(pathFolder, fileName);

        file.mv(resultPathFolder, (err) => {
            if (err) {
                console.info(err)

                return;
            }
        });

        return filePath;
    }
}

module.exports = new BrandController();