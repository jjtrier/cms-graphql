import {GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList,  GraphQLBoolean
} from 'graphql';
import {Field} from './fieldSchema.js';
import promise from 'bluebird';
// import promisify from 'es6-promisify';
import Db from '../../../database/setupDB.js';
import GraphQLJSON from 'graphql-type-json';

export default {
  createField: {
    type: Field,
    description: 'Create a new field',
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      description: {
        type: GraphQLString
      },
      datatypes: {
        type: new GraphQLList(GraphQLInt)
      },
      required: {
        type: new GraphQLNonNull(GraphQLBoolean)
      },
      dataJSON: {
        type: GraphQLJSON
      }
    },
    async resolve(source, args) {
      const createdField = await Db.models.field.create({
        name: args.name,
        description: args.description,
        dataJSON: args.dataJSON,
        required: args.required
      });
      if (args.datatypes !== undefined) {
        return dataTypeSetter(createdField, args.datatypes);
      }
      return createdField;
    }
  },
  updateField: {
    type: Field,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      name: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      required: {
        type: new GraphQLNonNull(GraphQLBoolean)
      },
      datatypes: {
        type: new GraphQLList(GraphQLInt)
      },
      dataJSON: {
        type: GraphQLJSON
      }
    },
    async resolve(source, args) {
      const fieldFound = await Db.models.field.findById(args.id);
      let toUpdateField = {};
      const keysArray = Object.keys(args);
      keysArray.forEach(key => {
        if ((args[key] !== undefined) && key !== 'id' && key !== 'datatypes') {
          toUpdateField[key] = args[key];
        }
      });
      const updatedField = await fieldFound.update(toUpdateField);
      if (updatedField.error) console.error(updatedField.error);
      if (args.datatypes !== undefined) {
        return dataTypeSetter(updatedField, args.datatypes);
      }
      return updatedField;
    }
  },
  deleteField: {
    type: Field,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    async resolve(source, args) {
      const fieldFound = await Db.models.field.findById(args.id);
      return fieldFound.destroy();
    }
  }
};
// utility function for setting datatypes
const dataTypeSetter = ((updatedField, argsDatatypes) => {
  const dataTypePromises = [];
  for (let i = 0; i < argsDatatypes.length; i++) {
    dataTypePromises.push(Db.models.datatype.findById(argsDatatypes[i]));
  }
  return promise.each(dataTypePromises, () => {})
  .then(_foundDatatypes => {
    return updatedField.setDatatypes(_foundDatatypes);
  })
  .then(() => {
    return updatedField.save();
  });
});
