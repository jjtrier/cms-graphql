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

describe('Graphql Field route testing, no server', () => {
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

  describe('getAllFields', () => {
    it('it should get all the fields', done => {
      const query = "query{getAllFields{id,name,description,required,dataJSON,datatypes{name,id,description}}}";
      graphql(Schema, query)
      .then(res => {
        const fields = res.data.getAllFields;
        expect(fields).to.be.a('array');
        expect(fields.length).to.equal(11);
        expect(fields[0]).to.have.property('name');
        expect(fields[1]).to.have.property('description');
        expect(fields[1]).to.have.property('id');
        expect(fields[1]).to.have.property('datatypes');
        expect(fields[2]).to.have.property('required');
        expect(fields[2]).to.have.property('dataJSON');
        expect(fields[0].name).to.be.a('string');
        expect(fields[0].datatypes).to.be.a('array');
        expect(fields[5].name).to.equal('Gallery Field');
        expect(fields[5].description).to.equal('a Gallery Field');
        expect(fields[5].required).to.equal(true);

        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('getFieldById', () => {
    it('it should get a field by id', done => {
      const query = "query{getFieldById(id:1){id,name,description,required,dataJSON,datatypes{name,id,description}}}";
      graphql(Schema, query)
      .then(res => {
        const field = res.data.getFieldById;
        expect(field).to.be.a('object');
        expect(field).to.have.property('name');
        expect(field).to.have.property('description');
        expect(field).to.have.property('id');
        expect(field).to.have.property('datatypes');
        expect(field).to.have.property('required');
        expect(field).to.have.property('dataJSON');
        expect(field.name).to.be.a('string');
        expect(field.datatypes).to.be.a('array');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('createField', () => {
    it('it should create a field', done => {
      const fieldMutation =
      `(
        name: $name,
        description: $description,
        datatypes: $datatypes,
        required: $required,
        dataJSON: $dataJSON
      )`;
      const fieldSchema = `{id,name,description,datatypes{name,id,description},dataJSON,required}`;
      const variables = {
        name: "Mike Powers Cool Spy",
        description: "A field of spies",
        datatypes: [1],
        required: false,
        dataJSON: {"stuff": "stuff", "mosttuff": "yet mo stuff"}
      };
      const query = `mutation CreateField($name: String!, $description: String, $datatypes: [Int], $required: Boolean!, $dataJSON: JSON){createField${fieldMutation}${fieldSchema}}`;
      graphql(Schema, query, null, context, variables)
      .then(res => {
        const field = res.data.createField;
        expect(field).to.be.a('object');
        expect(field).to.have.property('name');
        expect(field).to.have.property('description');
        expect(field).to.have.property('id');
        expect(field).to.have.property('datatypes');
        expect(field).to.have.property('required');
        expect(field.name).to.be.a('string');
        expect(field.name).to.equal('Mike Powers Cool Spy');
        expect(field.description).to.equal('A field of spies');
        expect(field.required).to.equal(false);
        expect(field.datatypes).to.be.a('array');
        expect(field.dataJSON).to.be.a('object');
        expect(field.dataJSON.stuff).to.equal('stuff');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('updateField', () => {
    it('it should update a field, finding it by id', done => {
      const query = 'mutation{updateField(id:3,name:"Mike Powers",description:"His yard",required: false, datatypes:[1,2]){id,name,description,required, dataJSON,datatypes{name,id,description}}}';
      graphql(Schema, query)
      .then(res => {
        const field = res.data.updateField;
        expect(field).to.be.a('object');
        expect(field).to.have.property('name');
        expect(field).to.have.property('description');
        expect(field).to.have.property('id');
        expect(field).to.have.property('datatypes');
        expect(field).to.have.property('required');
        expect(field).to.have.property('dataJSON');
        expect(field.name).to.be.a('string');
        expect(field.name).to.equal('Mike Powers');
        expect(field.description).to.equal('His yard');
        expect(field.required).to.equal(false);
        expect(field.datatypes).to.be.a('array');
        expect(field.datatypes.length).to.equal(2);
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('deleteField', () => {
    it('it should delete a field, finding it by id', done => {
      const query = 'mutation{deleteField(id:3){id,name}}';
      graphql(Schema, query)
      .then(res => {
        const field = res.data.deleteField;
        expect(field).to.be.a('object');
        expect(field.name).to.equal(null);
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
}); // end testing block
