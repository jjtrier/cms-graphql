import React, {Component, PropTypes} from 'react';
import styles from './categories.css';
import {Table, Button} from 'react-bootstrap';
import CategoryEditModal from './categoryEditModal.js';
// import FieldCreateModal from './fieldCreateModal.js';
import {deleteCategory, getAllCategories} from '../../ducks/categoriesDucks.js';
import ToggleDisplay from 'react-toggle-display';

let DeleteButton = React.createClass({
  propTypes: {
    onItemClick: PropTypes.func,
    category: PropTypes.object
  },
  render() {
    return (
      <Button bsStyle="danger" bsSize="xsmall" onClick={this._onClick}>Delete Category</Button>
    );
  },
  _onClick() {
    this.props.onItemClick(this.props.category.id);
  }
});

export default class Categories extends Component {
  static propTypes = {
    categories: PropTypes.array,
    dispatch: PropTypes.func,
    auth: PropTypes.object,
    datatypes: PropTypes.array
  }

  state = {
    isAuthorized: false
  }

  handleDelete = id => {
    this.props.dispatch(deleteCategory(id));
    this.props.dispatch(getAllCategories());
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
    // sort fields by id
    const self = this;
    const categories = this.props.categories.sort((a, b) => {
      return parseFloat(a.id) - parseFloat(b.id);
    });
    // templatize the categories to be placed in Component
    let template = categories.map((category, idx) => {
      let entries = processEntries(category);
      if(category.datatype === undefined || category.datatype === null) {
        category.datatype = {name: 'no datatype'};}
      return (
        <tr key={idx}>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>{category.datatype.name}</td>
          <td>{entries}...</td>
            <ToggleDisplay show={self.state.isAuthorized} tag="td" className={styles._center}>
              <CategoryEditModal category={category}
                datatypes={self.props.datatypes}
                dispatch={self.props.dispatch}/>
            </ToggleDisplay>
          <ToggleDisplay show={self.state.isAuthorized} tag="td"
            className={styles._center}>
            <DeleteButton category={category} onItemClick={self.handleDelete}></DeleteButton>
          </ToggleDisplay>
        </tr>
    );
    });

    return (
      <div className={styles._container}>
        <h1>Categories</h1>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Datatype</th>
              <th>Entry Titles</th>
              <th></th>
              <th></th>
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

const processEntries = category => {
  let entries = [];
  for (let i = 0; i < category.entries.length; i++) {
    entries.push(category.entries[i].title)
  }
  return entries.join().substring(0,30);
};
