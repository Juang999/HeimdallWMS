const { Category, SubCategory } = require('../../../models');

class CategoryService {
    createCategory = async ( categoryName, categoryCode, subCategoryName, transaction ) => {
        let result = await Category.create({
            category_name: categoryName,
            category_code: categoryCode,
            sub_categories: subCategoryName
        }, {
            include: [
                {
                    model: SubCategory,
                    as: 'sub_categories',
                }
            ],
            transaction
        });

        return result;
    }

    getDataCategory = async () => {
        let result = await Category.findAll({
            attributes: [
                ['id', 'category_id'], 
                'category_name',
                'category_code'
            ],
            include: [
                {
                    model: SubCategory,
                    as: 'sub_categories',
                    attributes: [
                        ['id', 'sub_category_id'],
                        'sub_category_name',
                        'sub_category_code'
                    ]
                }
            ]
        })

        return result;
    }

    updateCategory = async ( categoryId, categoryName, categoryCode ) => {
        let result = await Category.update({
            category_name: categoryName,
            category_code: categoryCode
        }, {
            where: {
                id: categoryId
            }
        });

        return result;
    }

    deleteCategory = async ( categoryId ) => {
        let result = await Category.destroy({
            where: {
                id: categoryId
            }
        })

        return result;
    }

    findCategory = async ( categoryId ) => {
        let result = await Category.findOne({
            attributes: [
                ['id', 'category_id'],
                'category_name',
                'category_code'
            ],
            include: [
                {
                    model: SubCategory,
                    as: 'sub_categories',
                    attributes: [
                        ['id', 'sub_category_id'],
                        'sub_category_name',
                        'sub_category_code'
                    ]
                }
            ],
            where: {
                id: categoryId
            }
        });

        return result;
    }

    addSubCategory = async ( categoryId, subCategoryName, subCategoryCode ) => {
        let result = await SubCategory.create({
            category_id: categoryId,
            sub_category_name: subCategoryName,
            sub_category_code: subCategoryCode
        });

        return result;
    }

    updateSubCategory = async ( subCategoryId, subCategoryName, subCategoryCode ) => {
        let result = await SubCategory.update({
            sub_category_name: subCategoryName,
            sub_category_code: subCategoryCode
        }, {
            where:{
                id: subCategoryId
            }
        });

        return result;
    }

    findSubCategory = async ( subCategoryId ) => {
        let result = await SubCategory.findOne({
            attributes: [
                ['id', 'sub_category_id'],
                'sub_category_name',
                'sub_category_code'
            ],
            where: {
                id: subCategoryId
            }
        });

        return result;
    }

    deleteSubCategory = async (subCategoryId) => {
        let result = await SubCategory.destroy({
            where: {
                id: subCategoryId
            }
        });

        return result;
    }
}

module.exports = new CategoryService();