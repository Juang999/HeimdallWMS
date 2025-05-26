const { Router } = require('express');
const router = Router();
const { BrandRequest, CategoryRequest, ColorRequest, SizeRequest } = require('../requests/Request');
const { AuthMiddleware } = require('../../auth/middleware/kernel');
const { 
    createBrand, 
    getDataBrand, 
    updateBrand, 
    deleteBrand 
} = require('../controllers/brand.controller');
const { 
    createCategory, 
    readCategory, findCategory, 
    updateCategory, 
    deleteCategory, 
    createSubCategory, 
    updateSubCategory, 
    deleteSubCategory 
} = require('../controllers/category.controller');
const {
    createColor,
    readColor,
    deleteColor
} = require('../controllers/color.controller');
const { 
    createSize,
    findSize,
    updateSize,
    deleteSize
} = require('../controllers/size.controller');

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
router.delete('/category/sub-category/:sub_category_id/delete', [ AuthMiddleware, CategoryRequest.DeleteParamsSubCategoryRequest ], deleteSubCategory);

/**
 * color's route
*/
router.post('/color/create', [ AuthMiddleware, ColorRequest.CreateColorRequest ], createColor);
router.get('/color/', [ AuthMiddleware ], readColor);
router.delete('/color/:color_id/delete', [ AuthMiddleware, ColorRequest.DeleteParamsColorRequest ], deleteColor);

/**
 * size's route
*/
router.post('/size/create', [ AuthMiddleware, SizeRequest.CreateSizeRequest ], createSize);
router.get('/size/:size_group_id/find', [ AuthMiddleware, SizeRequest.FindParamsSizeRequest ], findSize);
router.patch('/size/:size_id/update', [ AuthMiddleware, SizeRequest.UpdateParamsSizeRequest, SizeRequest.UpdateBodySizeRequest ], updateSize);
router.delete('/size/:size_id/delete', [ AuthMiddleware, SizeRequest.UpdateParamsSizeRequest ], deleteSize);

module.exports = router;