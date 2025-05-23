module.exports = {
    BrandRequest: {
        CreateBrandRequest: require('./brand/create-brand.request'),
        UpdateParamsBrandRequest: require('./brand/update-params-brand.request'),
        UpdateBodyBrandRequest: require('./brand/update-body-brand.request'),
        DeleteBrandRequest: require('./brand/delete-brand.request'),
    },
    CategoryRequest: {
        CreateCategoryRequest: require('./category/create-category.request'),
        UpdateParamsCategoryRequest: require('./category/update-params-category.request'),
        UpdateBodyCategoryRequest: require('./category/update-body-category.request'),
        DeleteParamsCategoryRequest: require('./category/delete-params-category.request'),
    }
}