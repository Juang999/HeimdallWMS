const { Category, SubCategory } = require('../../../models');

class CategoryService {
    createCategory = async ( categoryName, subCategoryName, transaction ) => {
        let result = await Category.create({
            category_name: categoryName,
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
                'category_name'
            ],
            include: [
                {
                    model: SubCategory,
                    as: 'sub_categories',
                    attributes: [
                        ['id', 'sub_category_id'],
                        'sub_category_name'
                    ]
                }
            ]
        })

        return result;
    }

    updateCategory = async ( categoryId, categoryName ) => {
        let result = await Category.update({
            category_name: categoryName
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
                'category_name'
            ],
            include: [
                {
                    model: SubCategory,
                    as: 'sub_categories',
                    attributes: [
                        ['id', 'sub_category_id'],
                        'sub_category_name'
                    ]
                }
            ],
            where: {
                id: categoryId
            }
        });

        return result;
    }

    addSubCategory = async ( categoryId, subCategoryName ) => {
        let result = await SubCategory.create({
            category_id: categoryId,
            sub_category_name: subCategoryName
        });

        return result;
    }

    updateSubCategory = async ( subCategoryId, subCategoryName ) => {
        let result = await SubCategory.update({
            sub_category_name: subCategoryName
        }, {
            where:{
                id: subCategoryId
            }
        });

        return result;
    }
}

module.exports = new CategoryService();