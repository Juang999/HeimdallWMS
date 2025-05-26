const { findLastSequence } = require('../services/product.service');
const { findDataBrand } = require('../services/brand.service');
const { findCategory, findSubCategory } = require('../services/category.service');
const { findDataMasterByIdAndField } = require('../../master-management/service/master.service');

class ProductController {
    createProduct = async (req, res) => {
        try {
            let {brand_id, category_id, sub_category_id, gender_id, product_name} = req.body;

            let codeMasterProduct = await this.generateCodeMasterProduct(brand_id, category_id, sub_category_id, gender_id, product_name);

            res.status(200)
                .json({
                    status: 'success',
                    message: 'created!',
                    data: codeMasterProduct,
                    error: null
                })
        } catch (error) {
            res.status(400)
                .json({
                    status: 'failed',
                    message: 'error',
                    data: null,
                    error: error.message
                })
        }
    }

    generateSequenceCode = async () => {
        let dataProductSequence = await findLastSequence();
        return (dataProductSequence) ? dataProductSequence.dataValues.sequence.toString().padStart(4, '0') : '0001';
    }

    generateCodeMasterProduct = async (brandId, categoryId, subCategoryId, genderId, productName) => {
        let [
            {dataValues: dataBrand},
            {dataValues: dataCategory},
            {dataValues: dataSubCategory},
            {dataValues: dataGender},
            sequenceProduct
        ] = await Promise.all([
            findDataBrand(brandId),
            findCategory(categoryId),
            findSubCategory(subCategoryId),
            findDataMasterByIdAndField(genderId, 'gender'),
            this.generateSequenceCode()
        ])

        let abbreviationProductName = this.getAbbreviationProductName(productName);

        let result = `${dataBrand.brand_code}${dataCategory.category_code}${dataSubCategory.sub_category_code}${dataGender.code_code}${abbreviationProductName}${sequenceProduct}`;

        return result;
    }

    getAbbreviationProductName = (productName) => {
        return productName.toUpperCase().split(' ').map(word => word.charAt(0)).join('');
    }
}

module.exports = new ProductController();