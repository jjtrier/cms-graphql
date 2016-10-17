import {GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList} from 'graphql';
import {Project} from './projectSchema.js';
import {Category} from './projectSchema.js';
import promise from 'bluebird';

import Db from '../../../database/setupDB.js';

export default {
  createProject: {
    type: Project,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      description: {
        type: GraphQLString
      },
      categories: {
        type: new GraphQLList(GraphQLInt)
      },
      users: {
        type: new GraphQLList(GraphQLInt)
      }
    },
    async resolve(source, args) {
      let createdProject = {};
      return Db.models.project.create({
        name: args.name,
        description: args.description
      })
      .then(project => {
        if (args.categories !== undefined) {
          return setCategories(project, args.categories);
        } else {
          return project;
        }
      })
      .then(project => {
        if (args.users !== undefined) {
          return setUsers(project, args.users);
        } else {
          return project;
        }
      });
    }
  },
  updateProject: {
    type: Project,
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
      categories: {
        type: new GraphQLList(GraphQLInt)
      },
      users: {
        type: new GraphQLList(GraphQLInt)
      }
    },
    async resolve(source, args) {
      const projectFound = await Db.models.project.findById(args.id);
      let toUpdateProject = {};
      const keysArray = Object.keys(args);
      keysArray.forEach(key => {
        if ( (args[key] !== undefined) && key !== 'id' && key !== 'fields') {
          toUpdateProject[key] = args[key];
        }
      });
      let updatedProject = await projectFound.update(toUpdateProject);
      if (updatedProject.error) console.error(updatedProject.error);
      if (args.categories !== undefined) {
        updatedProject = await setCategories(updatedProject, args.categories);
      }
      if (args.users !== undefined) {
        updatedProject = await setUsers(updatedProject, args.users);
      }
      return updatedProject;
    }
  },
  deleteProject: {
    type: Project,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    async resolve(source, args) {
      const projectFound = await Db.models.project.findById(args.id);
      return projectFound.destroy();
    }
  }
};

const setCategories = (createdProject, categoryIds) => {
  let categoriesPromises = [];
  categoryIds.forEach(id => {
    categoriesPromises.push(Db.models.category.findById(id));
  });
  return promise.each(categoriesPromises, () => {})
  .then(categories => {
    return createdProject.addCategories(categories);
  })
  .then(() => {
    return createdProject;
  });
};
const setUsers = (createdProject, userIds) => {
  let userPromises = [];
  userIds.forEach(id => {
    userPromises.push(Db.models.user.findById(id));
  });
  return promise.each(userPromises, () => {})
  .then(users => {
    return createdProject.addUsers(users);
  })
  .then(() => {
    return createdProject;
  });
};
