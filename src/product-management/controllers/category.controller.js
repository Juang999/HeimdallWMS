const { 
    findCategory,
    createCategory, getDataCategory, 
    updateCategory, deleteCategory, 
    addSubCategory, updateSubCategory,
    deleteSubCategory,
} = require('../services/category.service');
const { sequelize } = require('../../../models');

class CategoryController {
    createCategory = (req, res) => {
        sequelize.transaction(async t => {
            let result = await createCategory(req.body.category_name, req.body.sub_categories, t);

            return result;
        })
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

    readCategory = (req, res) => {
        getDataCategory()
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

    findCategory = (req, res) => {
        findCategory(req.params.category_id)
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

    updateCategory = (req, res) => {
        updateCategory(req.params.category_id, req.body.category_name)
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'updated',
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

    deleteCategory = (req, res) => {
        deleteCategory(req.params.category_id)
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

    createSubCategory = (req, res) => {
        addSubCategory(req.body.category_id, req.body.sub_category_name)
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'added',
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

    updateSubCategory = (req, res) => {
        updateSubCategory(req.params.sub_category_id, req.body.sub_category_name)
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'updated',
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

    deleteSubCategory = (req, res) => {
        deleteSubCategory(req.params.sub_category_id)
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

module.exports = new CategoryController();