const {Feature, SubFeature, Access} = require('../../../models');

class FeatureService {
    read = async () => {
        let result = await Feature.findAll({
            attributes: ['id', 'feature_name'],
            include: [
                {
                    model: SubFeature,
                    as: 'sub_features',
                    attributes: ['id', 'sub_feature_name'],
                    include: [
                        {
                            model: Access,
                            as: 'accesses',
                            attributes: ['id', 'access_name']
                        }
                    ],
                    order: [['id', 'ASC']],
                }
            ],
            where: {
                is_activate: true
            },
        });

        return result;
    }
}

module.exports = new FeatureService();