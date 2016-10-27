import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

import {Category} from '../Category/categorySchema';
import {User} from '../User/userSchema';

export const RoleTaggedUser = new GraphQLObjectType({
  name: 'UserWithProjectRoleAttached',
  description: "The user with their role attached",
  fields: () => ({
    user: {type: User, description: 'The user'},
    role: {type: GraphQLString, description: 'Users role in the project'}
  })
});

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
      },
      developerUsers: {
        type: new GraphQLList(User),
        resolve(project) {
          return project.getProjectUsersByType('developer');
        }
      },
      taggedUsers: {
        type: new GraphQLList(RoleTaggedUser),
        resolve(project) {
          let taggedUsers = [];
          return project.getProjectUsersByType('developer')
          .then(users => {
            let mappedUsers = users.map(user => {
              return {
                role: 'developer',
                user: user
              };
            });// end map
            return taggedUsers.concat(mappedUsers);
          });// end then
        }
      }
    };
  }
});
