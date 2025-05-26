const { Color } = require('../../../models');

class ColorService {
    createColor = async (colorName, hexCode) => {
        let result = await Color.create({
            color_name: colorName,
            hex_code: hexCode
        })

        return result;
    }

    getDataColor = async () => {
        const result = await Color.findAll({
            attributes: [
                ['id', 'color_id'],
                'color_name',
                'hex_code'
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