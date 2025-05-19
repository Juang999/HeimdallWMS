const {User, UserRole} = require('../../../models');

class AuthService {
    login = async (email) => {
        let result = await User.findAll({
            attributes: ['email', 'username', 'password'],
            include: [
                {
                    model: UserRole,
                    as: 'role_relationship',
                    attributes: ['role_id']
                }
            ],
            where: {
                email: email
            },
            subQuery: false,
        })

        return result;
    }
}

module.exports = new AuthService();