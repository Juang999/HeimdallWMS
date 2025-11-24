const { sequelize } = require('../../../models');
const { retrieveSizes } = require('../services/size.service');
const { findDataBrand } = require('../services/brand.service');
const { retrieveColors } = require('../services/color.service');
const { findLastSequence, createProduct, retrieveProducts, findProductById } = require('../services/product.service');
const { findCategory, findSubCategory } = require('../services/category.service');
const { findDataMasterByIdAndField } = require('../../master-management/service/master.service');

class ProductController {
    createProduct = (req, res) => {
        let {brand_id, category_id, sub_category_id, gender_id, product_name, description, bulk_color_id, bulk_size_id} = req.body;

        sequelize.transaction(async t => {
            // generate product sequence
            let sequenceProduct = await this.generateSequenceCode();

            // generate code master product
            let codeMasterProduct = await this.generateCodeMasterProduct(brand_id, category_id, sub_category_id, gender_id, product_name);

            // generate detail data product
            let detailDataProduct = await this.getDetailDataProduct(product_name, codeMasterProduct, bulk_color_id, bulk_size_id);

            let result = await createProduct({
                product_code: codeMasterProduct,
                product_name,
                description,
                brand_id,
                category_id,
                sub_category_id,
                product_seq: sequenceProduct,
                gender_id
            }, detailDataProduct, t);

            return result;
        })
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'created!',
                    data: result,
                    error: null
                })
        })
        .catch(error => {
            res.status(400)
                .json({
                    status: 'failed',
                    message: 'error',
                    data: null,
                    error: error.message
                })
        })
    }

    getProducts = (req, res) => {
        let search = (req.query.search) ? req.query.search : '';

        retrieveProducts(search)
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'retrieved!',
                    data: result,
                    error: null
                })
        })
        .catch(error => {
            res.status(400)
                .json({
                    status: 'failed',
                    message: 'error',
                    data: null,
                    error: error.message
                })
        })
    }

    findProduct = (req, res) => {
        findProductById(req.params.product_id)
        .then(result => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'retrieved!',
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

    getDetailDataProduct = async (productName, productCode, bulkColorId, bulkSizeId) => {
        let addGradeDataProduct = this.addGradeDetailProduct(productName, productCode);
        let addColorDataProduct = await this.addColorDetailProduct(addGradeDataProduct, bulkColorId);
        let addSizeDataProduct = await this.addSizeDetailColor(addColorDataProduct, bulkSizeId);

        return addSizeDataProduct;
    }

    addGradeDetailProduct = (productName, productCode) => {
        let grades = ['A', 'B', 'C'];

        let result = grades.map(element => {
            return {
                detail_product_code: `${productCode}${element}`,
                detail_product_name: (element != 'A') ? `${productName} $color $size - ${element}` : `${productName} $color $size`,
                grade: element
            }
        });

        return result;
    }

    addColorDetailProduct = async (dataProducts, bulkColorId) => {
        let dataColors = await retrieveColors(bulkColorId);
        let result = [];

        for (const singularDataProduct of dataProducts) {
            for (const {dataValues: singularDataColor} of dataColors) {
                result.push({
                    detail_product_code: `${singularDataProduct.detail_product_code}${singularDataColor.color_code}`,
                    detail_product_name: singularDataProduct.detail_product_name.replace('$color', singularDataColor.color_name),
                    grade: singularDataProduct.grade,
                    color_id: singularDataColor.id
                })
            }
        }

        return result;
    }

    addSizeDetailColor = async (dataProducts, bulkSizeId) => {
        let dataSizes = await retrieveSizes(bulkSizeId);
        let result = [];

        for (const singularDataProduct of dataProducts) {
            for (const {dataValues: singularDataSize} of dataSizes) {
                result.push({
                    detail_product_code: `${singularDataProduct.detail_product_code}${singularDataSize.size_code}`,
                    detail_product_name: singularDataProduct.detail_product_name.replace('$size', singularDataSize.size_name),
                    grade: singularDataProduct.grade,
                    color_id: singularDataProduct.color_id,
                    size_id: singularDataSize.id
                })
            }
        }

        return result;
    }
}

module.exports = new ProductController();