const { CodeMaster } = require('../../../models');

class MasterService {
    getDataFilteredByField = async (fieldName) => {
        let result = await CodeMaster.findAll({
            attributes: [
                ['id', 'code_id'],
                'code_name',
                ['code_code', 'code'],
                'description'
            ],
            where: {
                field: fieldName
            }
        });

        return result;
    }

    findDataMasterByIdAndField = async (codeMasterId, field) => {
        let result = await CodeMaster.findOne({
            attributes: ['id', 'code_name', 'code_code'],
            where: {
                id: codeMasterId,
                field: field
            }
        });

        return result;
    }
}

module.exports = new MasterService();