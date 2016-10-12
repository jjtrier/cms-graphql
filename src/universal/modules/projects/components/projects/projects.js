import React, {Component, PropTypes} from 'react';
import styles from './projects.css';
import {Table, Button} from 'react-bootstrap';
import ProjectEditModal from './projectEditModal.js';
import {setProject, deleteProject, getUsersProjectsById} from '../../ducks/projects.js';;
import {browserHistory} from 'react-router';
import ToggleDisplay from 'react-toggle-display';

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
    this.props.onItemClick(this.props.project.id);
  }
});

let DeleteButton = React.createClass({
  propTypes: {
    onItemClick: PropTypes.func,
    project: PropTypes.object
  },
  render() {
    return (
      <Button bsStyle="danger" bsSize="xsmall" onClick={this._onClick}>Delete Project</Button>
    );
  },
  _onClick() {
    this.props.onItemClick(this.props.project.id);
  }
});

export default class Projects extends Component {
  static propTypes = {
    projects: PropTypes.array,
    categories: PropTypes.array,
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

  handleDelete = id => {
    let userId = this.props.auth.user.id;
    this.props.dispatch(deleteProject(id, userId));
    // this.props.dispatch(getUsersProjectsById(this.props.auth.user.id));
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
    const self = this;
    const projects = this.props.projects.sort((a,b) => {
      return parseFloat(a.id) - parseFloat(b.id);
    })
    // templatize the projects to be placed into the Component
    let template = projects.map((project, idx) => {
      // pull names out of categories
      const categoryNames = project.categories.map(category => category.name).reduce((previousValue, currentValue) => {return previousValue + ',' + currentValue });

      return (
        <tr key={idx}>
          <td>{project.id}</td>
          <td>{project.name}</td>
          <td>{project.description}</td>
          <td>{categoryNames}</td>
          <ToggleDisplay show={self.state.isAuthorized} tag="td"
            className={styles._center}>
            <ProjectEditModal project={project}
              auth={self.props.auth}
              categories={self.props.categories}
              dispatch={self.props.dispatch}/>
          </ToggleDisplay>
          <ToggleDisplay show={self.state.isAuthorized} tag="td"
            className={styles._center}>
            <DeleteButton project={project} onItemClick={self.handleDelete}></DeleteButton>
          </ToggleDisplay>
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
              <th>Categories</th>
              <th>Edit</th>
              <th>Delete</th>
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
