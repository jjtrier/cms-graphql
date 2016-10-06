import React, {Component, PropTypes} from 'react';
import styles from './Users.css';
import {Table, Button} from 'react-bootstrap';
import UserEditModal from './userEditModal.js';
import UserCreateModal from './userCreateModal.js';
import {deleteUser} from '../../ducks/users.js';
import ToggleDisplay from 'react-toggle-display';

let DeleteButton = React.createClass({
  propTypes: {
    onItemClick: PropTypes.func,
    user: PropTypes.object
  },
  render() {
    return (
      <Button bsStyle="danger" bsSize="xsmall" onClick={this._onClick}>Delete</Button>
    );
  },
  _onClick() {
    this.props.onItemClick(this.props.user.id);
  }
});

export default class Users extends Component {
  static propTypes = {
    users: PropTypes.array,
    usertypes: PropTypes.array,
    dispatch: PropTypes.func,
    auth: PropTypes.object
  }

  state = {
    isAuthorized: false
  }

  handleDelete = id => {
    this.props.dispatch(deleteUser(id));
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
    const users = this.props.users.sort((a, b) => {
      return parseFloat(a.id) - parseFloat(b.id);
    });
    // templatize the users to be placed in Component
    let template = users.map((user, idx) => {
      return (
        <tr key={idx}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{processPermissions(user.permissions)}</td>
          <td>{user.usertype}</td>
          <ToggleDisplay show={self.state.isAuthorized} tag="td">
            <UserEditModal user={user} usertypes={self.props.usertypes} dispatch={self.props.dispatch}/>
          </ToggleDisplay>
          <ToggleDisplay show={self.state.isAuthorized} tag="td">
            <DeleteButton user={user} onItemClick={self.handleDelete}></DeleteButton>
          </ToggleDisplay>
        </tr>
    );
    });

    const usertypes = self.props.usertypes;
    return (
      <div className={styles._container}>
        <h1>Users</h1>
        <ToggleDisplay show={self.state.isAuthorized} tag="div">
          <UserCreateModal usertypes={usertypes} dispatch={self.props.dispatch}/>
        </ToggleDisplay>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Permissions</th>
              <th>Type</th>
              <ToggleDisplay show={self.state.isAuthorized} tag="th">
              </ToggleDisplay>
              <ToggleDisplay show={self.state.isAuthorized} tag="th">
              </ToggleDisplay>
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

const parsePermission = permission => {return permission.charAt(0).toUpperCase();};

function processPermissions (permissions) {
  let res = '';
  for (let i = 0; i < permissions.length; i++) {
    res += parsePermission(permissions[i]);
    if (i < permissions.length - 1) {
      res += ', ';
    }
  }
  return res;
};
