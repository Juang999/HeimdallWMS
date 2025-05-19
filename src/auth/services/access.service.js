const {RoleAccess} = require('../../../models');

class AccessService {
    create = async (data, transaction) => {
        await Access.bulkCreate(data, {transaction})
    }

    read = async () => {
        let result = await Access.findAll({
            attributes: ['id', 'access_name']
        });

        return result;
    }
}

module.exports = new AccessService();