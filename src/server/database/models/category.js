import Conn from '../_db';
import Sequelize from 'sequelize';
import {Entry} from './entry.js';
import {Datatype} from './datatype.js';

export const Category = Conn.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  visible: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
},
  {
    instanceMethods: {
      getDatatype: function () {// eslint-disable-line babel/object-shorthand
        const Id = this.get('id');
        console.log('Id in first one', Id);
        return Datatype.findAll({where: {categoryId: Id}})
        .then(function(datatype) {
          return datatype[0];
        });
      },
      getEntriesMethod: function () {// eslint-disable-line babel/object-shorthand
        const Id = this.get('id');
        return Entry.findAll({where: {categoryId: Id}})
        .then(function (entries) {
          return entries;
        });
      }
    }
  }
);
