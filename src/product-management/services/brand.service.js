const {Brand} = require('../../../models')

class BrandService {
    retrieveBrand = async () => {
        const result = await Brand.findAll();

        return result;
    }

    createBrand = async (brandName) => {
        let result = await Brand.create({
            brand_name: brandName
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

    updateBrand= async (brandId, brandName) => {
        let result = await Brand.update({
            brand_name: brandName
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