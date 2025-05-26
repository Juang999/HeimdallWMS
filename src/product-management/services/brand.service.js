const {Brand} = require('../../../models')

class BrandService {
    retrieveBrand = async () => {
        const result = await Brand.findAll();

        return result;
    }

    createBrand = async (brandName, brandCode) => {
        let result = await Brand.create({
            brand_name: brandName,
            brand_code: brandCode
        });

        return result;
    }

    deleteBrand = async (brandId) => {
        let result = await Brand.destroy({
            where: {
                id: brandId
            }
        })

        return result;
    }

    updateBrand= async (brandId, brandName, brandCode) => {
        let result = await Brand.update({
            brand_name: brandName,
            brand_code: brandCode
        }, {
            where: {
                id: brandId
            }
        });

        return result;
    }

    findDataBrand = async (brandId) => {
        let result = await Brand.findOne({
            where: {
                id: brandId
            }
        });

        return result;
    }
}

module.exports = new BrandService();