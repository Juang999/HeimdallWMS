const { Router } = require('express');
const router = Router();
const { BrandRequest, CategoryRequest } = require('../requests/Request');
const { AuthMiddleware } = require('../../auth/middleware/kernel');
const { createBrand, getDataBrand, updateBrand, deleteBrand } = require('../controllers/brand.controller');
const { createCategory, readCategory, findCategory, updateCategory, deleteCategory, createSubCategory, updateSubCategory } = require('../controllers/category.controller');

/**
 * brand's route
*/
router.get('/brand', [ AuthMiddleware ], getDataBrand);
router.post('/brand/create', [ AuthMiddleware, BrandRequest.CreateBrandRequest ], createBrand);
router.patch('/brand/:brand_id/update', [ AuthMiddleware, BrandRequest.UpdateParamsBrandRequest, BrandRequest.UpdateBodyBrandRequest ], updateBrand);
router.delete('/brand/:brand_id/delete', [ AuthMiddleware, BrandRequest.DeleteBrandRequest ], deleteBrand);

/**
 * category & sub category route
*/
router.post('/category/create', [ AuthMiddleware, CategoryRequest.CreateCategoryRequest ], createCategory);
router.get('/category', [ AuthMiddleware ], readCategory);
router.get('/category/:category_id/find', [ AuthMiddleware ], findCategory);
router.patch('/category/:category_id/update', [ AuthMiddleware, CategoryRequest.UpdateParamsCategoryRequest, CategoryRequest.UpdateBodyCategoryRequest ], updateCategory);
router.delete('/category/:category_id/delete', [ AuthMiddleware, CategoryRequest.DeleteParamsCategoryRequest ], deleteCategory);
router.post('/category/sub-category/create', [ AuthMiddleware, CategoryRequest.CreateSubCategoryRequest ], createSubCategory);
router.patch('/category/sub-category/:sub_category_id/update', [ AuthMiddleware, CategoryRequest.UpdateParamsSubCategoryRequest, CategoryRequest.UpdateBodySubCategoryRequest ], updateSubCategory);

module.exports = router;