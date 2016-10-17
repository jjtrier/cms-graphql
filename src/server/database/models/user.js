// this file also contains definitions for Pernission, Usertype, and Usertype
// their relations to each other are defined at the bottom

import Conn from '../_db';
import Sequelize from 'sequelize';

export const Permission = Conn.define('permission', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export const Usertype = Conn.define('usertype', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export const User = Conn.define('user', {
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  isVerified: {
    type: Sequelize.BOOLEAN
  }
},
  {
    instanceMethods: {
      addUserType: function (id) {// eslint-disable-line babel/object-shorthand
        this.set('usertypeId', id);
        return this.save();
      },
      getUserType: function () {// eslint-disable-line babel/object-shorthand
        let usertypeId = this.get('usertypeId');
        return Usertype.findById(usertypeId)
        .then(foundUserType => {
          return foundUserType;
        });
      },
      getPermissions: function () {// eslint-disable-line babel/object-shorthand
        const usertypeId = this.get('usertypeId');
        return Usertype.find({where: {id: usertypeId}})
        .then(function(usertype) {
          return usertype.getPermissions()
        })
        .then(function(permissions) {
          const permissionArray = [];
          permissions.forEach(permission => {
            permissionArray.push(permission.dataValues.name)
            // console.log('permission.dataValues.name', permission.dataValues.name);
          });
          return permissionArray;
        });
      }
    },
    classMethods: {
      findAllActiveUsers: function () {// eslint-disable-line babel/object-shorthand
        return this.findAll({where: {active: true}});
      }
    }
  }
);

const UsertypesPermissions = Conn.define('usertypes_permissions', {
  role: Sequelize.STRING
});
Usertype.belongsToMany(Permission, {through: UsertypesPermissions});
Permission.belongsToMany(Usertype, {through: UsertypesPermissions});
