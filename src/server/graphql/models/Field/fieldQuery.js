import {
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import {Field} from './fieldSchema.js';

import Db from '../../../database/setupDB.js';

export default {

  getAllFieldsBy: {
    type: new GraphQLList(Field),
    args: {
      id: {type: GraphQLID},
      name: {type: GraphQLString},
      description: {type: GraphQLString}
    },
    resolve(root, args) {
      return Db.models.field.findAll({where: args});
    }
  },
  getFieldById: {
    type: Field,
    description: "get a field by its id",
    args: {
      id: {type: new GraphQLNonNull(GraphQLID)}
    },
    async resolve(root, args) {
      const field = await Db.models.field.findById(args.id);
      return field;
    }
  },
  getAllFields: {
    type: new GraphQLList(Field),
    args: {
    },
    async resolve(root, args) {
      let fields = await Db.models.field.findAll();
      return fields.sort((a, b) => {
        return parseFloat(a.id) - parseFloat(b.id);
      });
    }
  }
};
