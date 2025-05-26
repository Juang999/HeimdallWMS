const { CodeMaster } = require('../../../models');

class MasterService {
    getDataFilteredByField = async (fieldName) => {
        let result = await CodeMaster.findAll({
            attributes: [
                ['id', 'code_id'],
                'code_name',
                'description'
            ],
            where: {
                field: fieldName
            }
        });

        return result;
    }
}

module.exports = new MasterService();