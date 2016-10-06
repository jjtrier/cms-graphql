import React, {Component, PropTypes} from 'react';
import styles from './Projects.css';
import {Table, Button} from 'react-bootstrap';
import {setProject} from '../../ducks/editProject.js';
import {browserHistory} from 'react-router'

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

  handleEdit = project => {
    console.log('inside handleEdit');
    this.props.dispatch(setProject(project));
    browserHistory.push('editProject');
  }

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
          <td><EditButton project={project} onItemClick={self.handleEdit}></EditButton></td>
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
              <th>Edit</th>
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
let EditButton = React.createClass({
  propTypes: {
    onItemClick: PropTypes.func,
    project: PropTypes.object
  },
  render() {
    return (
      <Button bsStyle="primary" bsSize="xsmall" onClick={this._onClick}>Edit</Button>
    );
  },
  _onClick() {
    this.props.onItemClick(this.props.project);
  }
});
