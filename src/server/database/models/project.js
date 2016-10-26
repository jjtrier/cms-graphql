import Conn from '../_db';
import Sequelize from 'sequelize';
import {User} from './user.js';
import {UsersToProjects} from './usersToProjects.js';
import promise from 'bluebird';

export const Project = Conn.define('project', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  }
},
{
  instanceMethods: {
    getProjectUsersByType: function (type) {// eslint-disable-line babel/object-shorthand
      const Id = this.get('id');
      return UsersToProjects.findAll({where: {role: type, projectId: Id}})
        .then(function (userToProjectsFound) {
          let findUserPromises = [];
          userToProjectsFound.forEach(function (userToProject) {
            findUserPromises.push(User.findById(userToProject.userId));
          });
          return promise.each(findUserPromises, () => {
          });
        })
      .then(function (users) {
        return users;
      });
    }
  }
  }
);
