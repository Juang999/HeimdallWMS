const { MasterProduct, DetailProduct, Sequelize } = require('../../../models');

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
            detail_products: dataDetail
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
                [Sequelize.literal(`CAST(product_seq AS UNSIGNED)`), 'sequence']
            ],
            order: [['createdAt', 'DESC']]
        });

        return result;
    }
}

module.exports = new ProductService();