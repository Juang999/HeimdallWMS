const {Roles, RoleFeature, RoleSubFeature, RoleAccess} = require('../../../models');

class RoleService {
    createRole = async (roleName, attributes, transaction) => {
        let result = await Roles.create({
            role_name: roleName,
            attributes
        }, {
            include: [
                {
                    model: RoleFeature,
                    as: 'feature',
                    include: [
                        {
                            model: RoleSubFeature,
                            as: 'sub_feature',
                            include: [
                                {
                                    model: RoleAccess,
                                    as: 'access'
                                }
                            ]
                        }
                    ]
                }
            ],
            transaction
        })

        return result;
    }
}

module.exports = new RoleService();