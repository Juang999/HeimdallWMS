const {User, UserRole, Roles, Sequelize} = require('../../../models');

class UserService {
    getProfile = async (email) => {
        let result = await User.findOne({
            attributes: ['username', 'email', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: UserRole,
                    as: 'role_relationship',
                    attributes: [
                        'role_id',
                        [Sequelize.literal("`role_relationship->roles`.`role_name`"), 'role_name'],
                    ],
                    include: [
                        {
                            model: Roles,
                            as: 'roles',
                            attributes: [],
                            required: true,
                        }
                    ]
                }
            ],
            where: {
                email
            },
            subQuery: false
        })

        return result;
    }
}

module.exports = new UserService();