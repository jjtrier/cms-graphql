/* eslint-disable no-undef */
const Db = require('../../src/server/database/setupDB');
const chai = require('chai');
import {seed} from '../../seed';
const should = chai.should();// eslint-disable-line
import {expect} from 'chai';
import {graphql} from 'graphql';
import Schema from '../../src/server/graphql/rootSchema';
const chalk = require('chalk');
const error = chalk.bold.red;

describe('Graphql Project route testing, no server', () => {
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

  describe('getAllProjects', () => {
    it('it should get all the projects', done => {
        const query = "{getAllProjects{id,name,description,categories{id,name},users{id,name,email,usertype}}}";
        graphql(Schema, query)
        .then(res => {
          const projects = res.data.getAllProjects;
          expect(projects).to.be.a('array');
          expect(projects.length).to.equal(10);
          expect(projects[0]).to.have.property('name');
          expect(projects[0]).to.have.property('description');
          expect(projects[0]).to.have.property('id');
          expect(projects[0]).to.have.property('users');
          expect(projects[0]).to.have.property('categories');
          expect(projects[0].name).to.be.a('string');
          expect(projects[0].description).to.be.a('string');
          done();
        })
        .catch(err => {
          console.log(error(err));
          // done();
        });
    });
  });
  describe('getUsersProjectsById', () => {
    it('it should get a users projects', done => {
        const query = "{getUsersProjectsById(id:1){id,name,description,categories{id,name},users{id,name,email,usertype}}}";
        graphql(Schema, query)
        .then(res => {
          const projects = res.data.getUsersProjectsById;
          expect(projects).to.be.a('array');
          expect(projects.length).to.equal(2);
          expect(projects[0]).to.have.property('name');
          expect(projects[0]).to.have.property('description');
          expect(projects[0]).to.have.property('id');
          expect(projects[0]).to.have.property('categories');
          expect(projects[0]).to.have.property('users');
          expect(projects[0].name).to.be.a('string');
          expect(projects[0].description).to.be.a('string');
          done();
        })
        .catch(err => {
          console.log(error(err));
          // done();
        });
    });
  });
  describe('getProjectById', () => {
    it('it should get a project by Id', done => {
        const query = "{getProjectById(id:1){id,name,description,categories{id,name},users{id,name,email,usertype}}}";
        graphql(Schema, query)
        .then(res => {
          const project = res.data.getProjectById;
          expect(project).to.have.property('name');
          expect(project).to.have.property('description');
          expect(project).to.have.property('id');
          expect(project).to.have.property('users');
          expect(project).to.have.property('categories');
          expect(project.name).to.be.a('string');
          expect(project.description).to.be.a('string');
          done();
        })
        .catch(err => {
          console.log(error(err));
          // done();
        });
    });
  });
  describe('createProject', () => {
    it('it should create a project', done => {
      const projectMutation =
      `(
        name: $name,
        description: $description,
        categories: $categories
      )`;
      const projectSchema = `{id,name,description,categories{id,name}}`;
      const variables = {
        name: "Toast on a stick",
        description: "Immortalize Larry Bud Melman",
        categories: [1, 2]
      };
      const query = `mutation M($name: String!, $description: String, $categories: [Int]){createProject${projectMutation}${projectSchema}}`;
      graphql(Schema, query, null, context, variables)
        .then(res => {
          const project = res.data.createProject;
          expect(project).to.have.property('name');
          expect(project).to.have.property('description');
          expect(project).to.have.property('id');
          expect(project).to.have.property('categories');
          expect(project.name).to.be.a('string');
          expect(project.name).to.equal('Toast on a stick');
          expect(project.description).to.equal('Immortalize Larry Bud Melman');
          expect(project.description).to.be.a('string');
          expect(project.categories.length).to.equal(2);
          done();
        })
        .catch(err => {
          console.log(error(err));
          // done();
        });
    });
  });
  describe('updateProject', () => {
    it('it should update a project', done => {
      const projectMutation =
      `(
        id: $id,
        name: $name,
        description: $description,
        categories: $categories,
        users: $users
      )`;
      const projectSchema = `{id,name,description,categories{id,name},users{id,name,email,usertype}}`;
      const variables = {
        id: 11,
        name: "Herding Cats",
        description: "A difficult task",
        categories: [3],
        users: [3]
      };
      const query = `mutation M($id: Int!, $name: String, $description: String, $categories: [Int], $users: [Int]){updateProject${projectMutation}${projectSchema}}`;
      graphql(Schema, query, null, context, variables)
        .then(res => {
          const project = res.data.updateProject;
          expect(project).to.have.property('name');
          expect(project).to.have.property('description');
          expect(project).to.have.property('id');
          expect(project).to.have.property('categories');
          expect(project).to.have.property('users');
          expect(project.name).to.be.a('string');
          expect(project.name).to.equal('Herding Cats');
          expect(project.users[0].id).to.equal(3);
          expect(project.description).to.equal('A difficult task');
          expect(project.description).to.be.a('string');
          expect(project.categories.length).to.equal(3);
          done();
        })
        .catch(err => {
          console.log(error(err));
          // done();
        });
    });
  });
  describe('updateProject with a user', () => {
    it('it should update a project, adding one user', done => {
      const projectMutation =
      `(
        id: $id,
        users: $users
      )`;
      const projectSchema = `{id,name,description,categories{id,name},users{id,name,email,usertype}}`;
      const variables = {
        id: 11,
        users: [4]
      };
      const query = `mutation M($id: Int!, $users: [Int]){updateProject${projectMutation}${projectSchema}}`;
      graphql(Schema, query, null, context, variables)
        .then(res => {
          const project = res.data.updateProject;
          expect(project).to.have.property('name');
          expect(project).to.have.property('description');
          expect(project).to.have.property('id');
          expect(project).to.have.property('categories');
          expect(project).to.have.property('users');
          expect(project.name).to.be.a('string');
          expect(project.users.length).to.equal(2);
          done();
        })
        .catch(err => {
          console.log(error(err));
          // done();
        });
    });
  });

  describe('deleteProject', () => {
    it('it should delete a project', done => {
      const query = 'mutation{deleteProject(id:11){id}}';
      graphql(Schema, query)
      .then(res => {
        const project = res.data.deleteProject;
        expect(project).to.have.property('id');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
}); // end testing block
