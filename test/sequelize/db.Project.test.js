/* eslint-disable no-undef */
const Db = require('../../src/server/database/setupDB');
const chai = require('chai');
import {seed} from '../../seed';

const should = chai.should();// eslint-disable-line no-unused-vars

describe('Project Db testing', () => {
  let createdProject = {};
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
  describe('Get all projects', () => {
    it('should get all projects', done => {
      Db.models.project.findAll()
      .then(projects => {
        projects.should.be.a('array');
        projects.length.should.equal(10);
        projects[0].should.have.property('name');
        projects[1].should.have.property('description');
        projects[0].should.have.property('id');
        projects[1].should.have.property('createdAt');
        projects[1].should.have.property('updatedAt');
        projects[0].name.should.be.a('string');
        projects[1].description.should.be.a('string');
        projects[2].getCategories()
        .then(categories => {
          // console.log('categories in test', categories);
          categories.should.be.a('array');
        });
        // projects[1].name.should.contain('Promo');
        // projects[1].description.should.contain('ribs');
        done();
      }); // end then
    });
  });

  describe('Create a project', () => {
    it('should create a project', done => {
      const newProject = {
        name: 'Wash cats today',
        description: 'Flank ribeye sirloin, rump bresaola beef pancetta short ribs porchetta chuck frankfurter. Kevin ribeye meatball bresaola shank pork belly. Ham beef chicken ball tip, cow spare ribs biltong drumstick pork beef ribs.'
      };
      Db.models.project.create(newProject)
      .then(project => {
        project.should.be.a('object');
        project.should.have.property('name');
        project.should.have.property('description');
        project.should.have.property('id');
        project.should.have.property('createdAt');
        project.should.have.property('updatedAt');
        project.name.should.be.a('string');
        project.description.should.be.a('string');
        project.name.should.contain('Wash');
        project.description.should.contain('bresaola shank pork belly');
        createdProject = project;
        done();
      }); // end then
    });
  });
  describe('Add users to a project', () => {
    it('should users to a project', done => {
      Db.models.user.findAll()
      .then(users => {
        return createdProject.setUsers(users);
      })
      .then(() => {
        return createdProject.getUsers();
      })
      .then(users => {
        users.should.be.a('array');
        users.length.should.equal(5);
        users[1].email.should.be.a('string');
        done();
      });
    });
  });
}); // end projects test block
