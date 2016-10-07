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

describe('Graphql Datatype route testing, no server', () => {
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

  describe('getAllDatatypes', () => {
    it('it should get all the datatypes', done => {
      const query = "{getAllDatatypes{id,name,description,visible,fields{id,name,description}}}";
      graphql(Schema, query)
      .then(res => {
        const datatypes = res.data.getAllDatatypes;
        expect(datatypes).to.be.a('array');
        expect(datatypes.length).to.equal(5);
        expect(datatypes[0]).to.have.property('name');
        expect(datatypes[0]).to.have.property('description');
        expect(datatypes[0]).to.have.property('id');
        expect(datatypes[0]).to.have.property('visible');
        expect(datatypes[0].name).to.be.a('string');
        expect(datatypes[0].description).to.be.a('string');
        expect(datatypes[0].visible).to.be.a('boolean');
        expect(datatypes[0].fields).to.be.a('array');
        expect(datatypes[0].fields[0].name).to.equal('HTML Template');

        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('getDatatypeById', () => {
    it('it should get datatype by Id', done => {
      const query = "{getDatatypeById(id:1){id,name,description,visible}}";
      graphql(Schema, query)
      .then(res => {
        const datatype = res.data.getDatatypeById;
        expect(datatype).to.have.property('name');
        expect(datatype).to.have.property('description');
        expect(datatype).to.have.property('visible');
        expect(datatype).to.have.property('id');
        expect(datatype.name).to.be.a('string');
        expect(datatype.description).to.be.a('string');
        expect(datatype.visible).to.be.a('boolean');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('createDatatype', () => {
    it('it should create an datatype', done => {
      const query = `
      mutation{
          createDatatype(name:"Cat Grooming",
            description:"Proper Cat Grooming",
            visible:true,fields:[1,2]){id,name,description,visible,fields{id,name,description}}}`;
      graphql(Schema, query)
      .then(res => {
        const datatype = res.data.createDatatype;
        expect(datatype).to.have.property('id');
        expect(datatype.name).to.equal('Cat Grooming');
        expect(datatype.id).to.equal(6);
        expect(datatype.description).to.equal('Proper Cat Grooming');
        expect(datatype.visible).to.equal(true);
        expect(datatype.fields).to.be.a('array');
        expect(datatype.fields.length).to.equal(2);
        expect(datatype.fields[0].name).to.equal('HTML Template');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('updateDatatype', () => {
    it('it should update an datatype', done => {
      const datatypeMutation =
      `(
        id: $id,
        name: $name,
        description: $description,
        visible: $visible,
        fields: $fields
      )`;
      const datatypeSchema = `{id,name,description,visible,fields{id,name,description}}`;
      const variables = {
        id: 6,
        name: "Cat Grooming Tips from pros",
        description: "Proper Cat Grooming in NYC",
        visible: false,
        fields: [2]
      };
      const query = `mutation M($id: Int!, $name: String, $description: String, $visible: Boolean, $fields: [Int]){updateDatatype${datatypeMutation}${datatypeSchema}}`;
      graphql(Schema, query, null, context, variables)
      .then(res => {
        console.log('res', res);
        const datatype = res.data.updateDatatype;
        expect(datatype).to.have.property('id');
        expect(datatype.name).to.equal('Cat Grooming Tips from pros');
        expect(datatype.description).to.equal('Proper Cat Grooming in NYC');
        expect(datatype.visible).to.equal(false);
        expect(datatype.fields).to.be.a('array');
        expect(datatype.fields.length).to.equal(1);
        expect(datatype.fields[0].name).to.equal('CSS');
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
  describe('deleteDatatype', () => {
    it('it should delete a datatype, finding it by id', done => {
      const query = 'mutation{deleteDatatype(id:6){id,name}}';
      graphql(Schema, query)
      .then(res => {
        const datatype = res.data.deleteDatatype;
        expect(datatype).to.be.a('object');
        expect(datatype.name).to.equal(null);
        done();
      })
      .catch(err => {
        console.log(error(err));
        // done();
      });
    });
  });
}); // end testing block
