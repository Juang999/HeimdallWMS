const { Router } = require('express');
const router = Router();
const { BrandRequest, CategoryRequest } = require('../requests/Request');
const { AuthMiddleware } = require('../../auth/middleware/kernel');
const { createBrand, getDataBrand, updateBrand, deleteBrand } = require('../controllers/brand.controller');
const { createCategory, readCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');

/**
 * brand's route
*/
router.get('/brand', [ AuthMiddleware ], getDataBrand);
router.post('/brand/create', [ AuthMiddleware, BrandRequest.CreateBrandRequest ], createBrand);
router.patch('/brand/:brand_id/update', [ AuthMiddleware, BrandRequest.UpdateParamsBrandRequest, BrandRequest.UpdateBodyBrandRequest ], updateBrand);
router.delete('/brand/:brand_id/delete', [ AuthMiddleware, BrandRequest.DeleteBrandRequest ], deleteBrand);

/**
 * category's route
*/
router.post('/category/create', [ AuthMiddleware, CategoryRequest.CreateCategoryRequest ], createCategory);
router.get('/category', [ AuthMiddleware ], readCategory);
router.patch('/category/:category_id/update', [ AuthMiddleware, CategoryRequest.UpdateParamsCategoryRequest, CategoryRequest.UpdateBodyCategoryRequest ], updateCategory);
router.delete('/category/:category_id/delete', [ AuthMiddleware, CategoryRequest.DeleteParamsCategoryRequest ], deleteCategory);

module.exports = router;