const { 
    Sequelize, 
    MasterProduct, DetailProduct,
    Category, SubCategory,
    Brand, CodeMaster
} = require('../../../models');
const { Op } = require('sequelize');

class ProductService {
    createProduct = async (dataHeader, dataDetail, transaction) => {
        let result = await MasterProduct.create({
            product_code: dataHeader.product_code,
            product_name: dataHeader.product_name,
            description: dataHeader.description,
            brand_id: dataHeader.brand_id,
            category_id: dataHeader.category_id,
            sub_category_id: dataHeader.sub_category_id,
            product_seq: dataHeader.product_seq,
            detail_products: dataDetail,
            gender_id: dataHeader.gender_id
        }, {
            include: [
                {
                    model: DetailProduct,
                    as: 'detail_products'
                }
            ],
            transaction
        });

        return result;
    }

    findLastSequence = async () => {
        let result = await MasterProduct.findOne({
            attributes: [
                [Sequelize.literal(`CAST(product_seq AS UNSIGNED) + 1`), 'sequence']
            ],
            order: [['createdAt', 'DESC']]
        });

        return result;
    }

    retrieveProducts = async (search) => {
        let result = await MasterProduct.findAll({
            attributes: [
                ['id', 'product_id'],
                [Sequelize.col(`brand.brand_name`), 'brand_name'],
                [Sequelize.col(`brand.brand_code`), 'brand_code'],
                'product_name',
                'product_code',
                [Sequelize.col(`category.category_name`), 'category_name'],
                [Sequelize.col(`sub_category.sub_category_name`), 'sub_category_name'],
                [Sequelize.col(`gender.code_name`), 'geder_desc']
            ],
            include: [
                {
                    model: Brand,
                    as: 'brand',
                    attributes: []
                }, 
                {
                    model: Category,
                    as: 'category',
                    attributes: []
                }, {
                    model: SubCategory,
                    as: 'sub_category',
                    attributes: []
                }, {
                    model: CodeMaster,
                    as: 'gender',
                    attributes: []
                }
            ],
            where: {
                product_name: {
                    [Op.like]: `%${search}%`
                }
            }
        });

        return result;
    }

    findProductById = async (productId) => {
        let result = await MasterProduct.findByPk(productId, {
            attributes: [
                'id',
                [Sequelize.col(`brand.brand_name`), 'brand_name'],
                [Sequelize.col(`brand.brand_code`), 'brand_code'],
                'product_code',
                'product_name',
                'description',
                [Sequelize.col(`category.category_name`), 'category_name'],
                [Sequelize.col(`sub_category.sub_category_name`), 'sub_category_name'],
                [Sequelize.col(`gender.code_name`), 'geder_desc'],
            ],
            include: [
                {
                    model: Brand,
                    as: 'brand',
                    attributes: []
                }, {
                    model: Category,
                    as: 'category',
                    attributes: []
                }, {
                    model: SubCategory,
                    as: 'sub_category',
                    attributes: []
                }, {
                    model: CodeMaster,
                    as: 'gender',
                    attributes: []
                }, {
                    model: DetailProduct,
                    as: 'detail_products',
                    attributes: [
                        'id',
                        'detail_product_code',
                        'detail_product_name',
                        'grade'
                    ]
                }
            ]
        });

        return result;
    }
}

module.exports = new ProductService();