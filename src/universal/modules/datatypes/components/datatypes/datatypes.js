import React, {Component, PropTypes} from 'react';
import styles from './datatypes.css';
import {Table, Button} from 'react-bootstrap';
import DatatypeEditModal from './datatypeEditModal.js';
// import DatatypeCreateModal from './datatypeCreateModal.js';
import {deleteDatatype} from '../../ducks/datatypesDucks.js';
import ToggleDisplay from 'react-toggle-display';

let DeleteButton = React.createClass({
  propTypes: {
    onItemClick: PropTypes.func,
    datatype: PropTypes.object
  },
  render() {
    return (
      <Button bsStyle="danger" bsSize="xsmall" onClick={this._onClick}>Delete</Button>
    );
  },
  _onClick() {
    this.props.onItemClick(this.props.datatype.id);
  }
});

export default class Datatypes extends Component {
  static propTypes = {
    datatypes: PropTypes.array,
    fields: PropTypes.array,
    dispatch: PropTypes.func,
    auth: PropTypes.object
  }

  state = {
    isAuthorized: false
  }

  handleDelete = id => {
    this.props.dispatch(deleteDatatype(id));
  }

  checkPermissions = permissions => {
    if (!permissions) return false;
    if (permissions.indexOf('write') > -1) {
      return true;
    }
    return false;
  }

  componentWillUpdate(nextProps) {
    const self = this;
    if (nextProps.auth.user.permissions !== self.props.auth.user.permissions) {
      this.setState({
        isAuthorized: self.checkPermissions(self.props.auth.user.permissions)
      });
    }
  }

  render() {
    // sort users by id
    const self = this;
    const datatypes = this.props.datatypes.sort((a, b) => {
      return parseFloat(a.id) - parseFloat(b.id);
    });
    // templatize the datatypes to be placed in Component
    let template = datatypes.map((datatype, idx) => {
      return (
        <tr key={idx}>
          <td>{datatype.id}</td>
          <td>{datatype.name}</td>
          <td>{datatype.description}</td>
          <td>{getFieldNames(datatype.fields)}</td>
          <ToggleDisplay show={self.state.isAuthorized} tag="td">
            <DatatypeEditModal datatype={datatype}
              fields={self.props.fields}
              dispatch={self.props.dispatch}/>
          </ToggleDisplay>
          <ToggleDisplay show={self.state.isAuthorized} tag="td">
            <DeleteButton datatype={datatype} onItemClick={self.handleDelete}></DeleteButton>
          </ToggleDisplay>
        </tr>
    );
    });

    return (
      <div className={styles._container}>
        <h1>Datatypes</h1>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Fields</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {template}
          </tbody>
        </Table>
      </div>
    );
  }
}

const getFieldNames = fields => {
  let fieldNames = '';
  for (let i = 0; i < fields.length; i++) {
    fieldNames += fields[i].name;
    if (i < fields.length-1) {
      fieldNames += ', ';
    }
  }
  return fieldNames;
}
