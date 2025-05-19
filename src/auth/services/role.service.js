const {Roles, RoleFeature, RoleSubFeature, RoleAccess} = require('../../../models');

class RoleService {
    createRole = async (roleName, attributes, transaction) => {
        let result = await Roles.create({
            role_name: roleName,
            role_features: attributes
        }, {
            include: [
                {
                    model: RoleFeature,
                    as: 'role_features',
                    include: [
                        {
                            model: RoleSubFeature,
                            as: 'role_subfeatures',
                            include: [
                                {
                                    model: RoleAccess,
                                    as: 'role_accesses'
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