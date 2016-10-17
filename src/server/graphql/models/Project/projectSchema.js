import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

import {Category} from '../Category/categorySchema';
import {User} from '../User/userSchema';

export const Project = new GraphQLObjectType({
  name: 'Project',
  description: "This is a project",
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(project) {
          return project.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(project) {
          return project.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve(project) {
          return project.description;
        }
      },
      categories: {
        type: new GraphQLList(Category),
        resolve(project) {
          return project.getCategories();
        }
      },
      users: {
        type: new GraphQLList(User),
        resolve(project) {
          return project.getUsers();
        }
      }
    };
  }
});
