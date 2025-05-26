const { Color } = require('../../../models');

class ColorService {
    createColor = async (colorName, hexCode, colorCode) => {
        let result = await Color.create({
            color_name: colorName,
            hex_code: hexCode,
            color_code: colorCode
        })

        return result;
    }

    getDataColor = async () => {
        const result = await Color.findAll({
            attributes: [
                ['id', 'color_id'],
                'color_name',
                'hex_code',
                'color_code'
            ]
        });

        return result;
    }

    deleteColor = async (colorId) => {
        let result = await Color.destroy({
            where: {
                id: colorId
            }
        });

        return result;
    }
}

module.exports = new ColorService();