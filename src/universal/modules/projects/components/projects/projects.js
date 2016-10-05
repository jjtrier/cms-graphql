import React, {Component, PropTypes} from 'react';
import styles from './Projects.css';
import {Table, Button} from 'react-bootstrap';
// import UserEditModal from './userEditModal.js';
// import UserCreateModal from './userCreateModal.js';
import ToggleDisplay from 'react-toggle-display';

export default class Users extends Component {
  static propTypes = {
    projects: PropTypes.array,
    dispatch: PropTypes.func,
    auth: PropTypes.object
  }

  state = {
    isAuthorized: false,
    projects: this.props.projects
  }
  // handleDelete = id => {
  //   this.props.dispatch(deleteUser(id));
  // }
  checkPermissions = permissions => {
    if (!permissions) return false;
    if (permissions.indexOf('write') > -1) {
      return true;
    }
    return false;
  }

  componentWillUpdate(nextProps) {
    console.log('this.props.projects !!', this.props.projects);
    const self = this;
    if (nextProps.auth.user.permissions !== self.props.auth.user.permissions) {
      this.setState({
        isAuthorized: self.checkPermissions(self.props.auth.user.permissions)
      });
    }
  }

  render() {
    const self = this;
    const projects = this.props.projects.sort((a,b) => {
      return parseFloat(a.id) - parseFloat(b.id);
    })
    // templatize the projects to be placed into the Component
    let template = projects.map((project, idx) => {
      return (
        <tr key={idx}>
          <td>{project.id}</td>
          <td>{project.name}</td>
          <td>{project.description}</td>
        </tr>
      );
    });


    return (
      <div className={styles._container}>
        <h1>Projects</h1>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
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
