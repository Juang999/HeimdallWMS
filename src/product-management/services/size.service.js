const { Size, CodeMaster } = require('../../../models');

class SizeService {
    createSize = async (body) => {
        let result = await Size.bulkCreate(body);

        return result;
    }

    findDataSizeBySizeGroup = async (sizeGroupId) => {
        let result = await CodeMaster.findOne({
            attributes: [
                ['id', 'size_group_id'],
                ['code_name', 'group_name']
            ],
            include: [
                {
                    model: Size,
                    as: 'size',
                    attributes: [
                        ['id', 'size_id'],
                        'size_name'
                    ]
                }
            ],
            where: {
                id: sizeGroupId,
                field: 'size-group'
            }
        });

        return result;
    }

    findDataSizeById = async (sizeId) => {
        let result = await Size.findByPk(sizeId, {
            attributes: ['size_name', 'size_group_id']
        });

        return result;
    }

    updateSize = async (sizeId, dataSize, defaultData) => {
        let result = await Size.update({
            size_name: (dataSize.size_name) ? dataSize.size_name : defaultData.size_name,
            size_group_id: (dataSize.size_group_id) ? dataSize.size_group_id : defaultData.size_group_id
        }, {
            where: {
                id: sizeId
            }
        });

        return result;
    }

    deleteSize = async (sizeId) => {
        let result = await Size.destroy({
            where: {
                id: sizeId
            }
        });

        return result;
    }
}

module.exports = new SizeService();