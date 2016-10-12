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
      }
    },
    async resolve(source, args) {
      let createdProject = {};
      return Db.models.project.create({
        name: args.name,
        description: args.description
      })
      .then(project => {
        createdProject = project;
        return;
      })
      .then(() => {
        let categoriesPromises = [];
        args.categories.forEach(id => {
          categoriesPromises.push(Db.models.category.findById(id));
        })
        return promise.each(categoriesPromises, () => {});
      })
      .then(categories => {
        return createdProject.setCategories(categories);
      })
      .then(() => {
        return createdProject;
      })
    }
  },
  updateProject: {
    type: Project,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      description: {
        type: GraphQLString
      },
      categories: {
        type: new GraphQLList(GraphQLInt)
      }
    },
    async resolve(source, args) {
      const projectFound = await Db.models.project.findById(args.id);
      const updatedProject = await projectFound.update({name: args.name});
      if (updatedProject.error) console.error(updatedProject.error);
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
