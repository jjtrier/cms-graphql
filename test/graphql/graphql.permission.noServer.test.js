/* eslint-disable no-undef */
const Db = require('../../src/server/database/setupDB');
const chai = require('chai');
import {seed} from '../../seed';
import {graphql} from 'graphql';
import {expect} from 'chai';
import Schema from '../../src/server/graphql/rootSchema';
const chalk = require('chalk');
const error = chalk.bold.red;

const should = chai.should();// eslint-disable-line no-unused-vars

describe('Graphql Permission route testing', () => {
  before(done => {
    seed().then(() => {
      done();
    })
    .catch(err => {
      console.error(err);
      done();
    });
  });
  after(done => {
    // console.log('Db', Db);
    Db.drop().then(() => {
      done();
    })
    .catch(err => {
      console.error(err);
      done();
    });
  });
  describe('getAllPermissions', () => {
    it('it should get all the permissions', done => {
      const query = "{getAllPermissions{id,name}}";
      graphql(Schema, query)
        .then(res => {
          // console.log('res.body.data.getAllPermissions', res.body.data.getAllPermissions);
          const permissions = res.data.getAllPermissions;
          expect(permissions.length).to.equal(4);
          expect(permissions[1].name).to.equal('write');
          expect(permissions[1].id).to.equal(2);
          done();
        })
        .catch(err => {
          console.log(error(err));
          // done();
        });
    });
  });
  describe('getPermissionById', () => {
    it('it should get a permission by id', done => {
      const query = "query{getPermissionById(id:2){id,name}}";
      graphql(Schema, query)
        .then(res => {
          const permission = res.data.getPermissionById;
          expect(permission.name).to.equal('write');
          expect(permission.id).to.equal(2);
          done();
        })
        .catch(err => {
          console.log(error(err));
          // done();
        });
    });
  });
  describe('createPermission', () => {
    it('it should create a permission', done => {
      const query = 'mutation{createPermission(name:"burn"){id,name}}';
      graphql(Schema, query)
        .then(res => {
          const permission = res.data.createPermission;
          expect(permission.name).to.equal('burn');
          expect(permission.id).to.equal(5);
          done();
        })
        .catch(err => {
          console.log(error(err));
          // done();
        });
    });
  });
  describe('updatePermission', () => {
    it('it should update a permission', done => {
      const query = 'mutation{updatePermission(id:3,name:"lube"){id,name}}';
      graphql(Schema, query)
        .then(res => {
          const permission = res.data.updatePermission;
          expect(permission).to.be.a('object');
          expect(permission.name).to.equal('lube');
          expect(permission.id).to.equal(3);
          done();
        })
        .catch(err => {
          console.log(error(err));
          // done();
        });
    });
  });
  describe('deletePermission', () => {
    it('it should delete a permission', done => {
      const query = 'mutation{deletePermission(id:5){id,name}}';
      graphql(Schema, query)
        .then(res => {
          const permission = res.data.deletePermission;
          expect(permission).to.be.a('object');
          done();
        })
        .catch(err => {
          console.log(error(err));
          // done();
        });
    });
  });
}); // end testing block
