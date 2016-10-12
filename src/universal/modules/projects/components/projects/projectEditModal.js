import React, {Component, PropTypes} from 'react';
// import keydown from 'react-keydown';
import stylesToo from './projects.css';
import {Dialog, FlatButton, TextField, Divider, SelectField, MenuItem} from 'material-ui';
import {blue300, indigo900, green200} from 'material-ui/styles/colors';
import {updateProject} from '../../ducks/projects.js';
import {Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import {styles} from './modalStyles.js';
import {DeletableChip, AddableChip} from './subComponents/subComponents.js';

const chosenChecker = (item, checkAgainst) => {
  let res = false;
  let count = 0;
  checkAgainst.forEach(check => {
    if (check.id === item.id) {
      count++;
      res = true;
    }
  });
  return {result: res, count};
};

const idsFromCategories = fields => {
  let ids = [];
  for (let i = 0; i < fields.length; i++) {
    ids.push(fields[i].id);
  }
  return ids;
};

export default class ProjectEditModal extends Component {
  static propTypes = {
    project: PropTypes.object,
    auth: PropTypes.object,
    categories: PropTypes.array,
    dispatch: PropTypes.func
  }
  state = {
    open: false,
    id: this.props.project.id,
    name: this.props.project.name,
    description: this.props.project.description,
    categories: this.props.project.categories,
    errorText: ''
  };

// this handles any changes to the inputs
  handleChange = event => {
    const lineKey = event.target.id;
    this.setState({
      [lineKey]: event.target.value
    });
  };

  handleRequestChipDelete = id => {
    let newCategories = [];
    newCategories = this.state.categories.filter(category => category.id !== id);
    this.setState({categories: newCategories});
  }
  handleChipAdd = category => {
    this.setState({categories: this.state.categories.concat([category])});
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleSubmit = () => {
    this.setState({open: false});

    let newProjectInfo = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      categories: idsFromCategories(this.state.categories)
    };
    JSON.stringify(newProjectInfo);
    let userId = this.props.auth.user.id;
    this.props.dispatch(updateProject(userId, newProjectInfo));
  };
// this handles the closing of the modal/dialog
  handleClose = () => {
    this.setState({
      open: false,
      categories: this.props.project.categories
    });
  };

  render() {
    // these are used by the modal
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        onTouchTap={this.handleSubmit}
      />
    ];
    // templatize the fields to be chips in Component
    const self = this;
    let allCategories = this.props.categories;
    let categories = this.state.categories;
    let templateStoredCategories = categories.map((category, idx) => {
      return (
        <ListGroupItem key={idx}>
          <DeletableChip category={category} onDeleteClick={self.handleRequestChipDelete}></DeletableChip>
        </ListGroupItem>
      );
    });
    // templatize all available fields to be chips in Component
    let templateAllCategories = allCategories.map((category, idx) => {
      let backgroundColor = blue300;
      let check = chosenChecker(category, this.state.categories);
      if (check.result === true) {
        backgroundColor = green200;
      }
      return (
        <ListGroupItem key={idx}>
          <AddableChip
            backgroundColor={backgroundColor}
            category={category}
            count={check.count}
            onAddClick={self.handleChipAdd}>
          </AddableChip>
        </ListGroupItem>
      );
    });
    const editProjectName = (`Edit Project: ${this.state.id}`);
    return (
      <div>
        <Button bsStyle="info" bsSize="xsmall" onTouchTap={this.handleOpen}>Edit Project</Button>
        <Dialog
          title={editProjectName}
          contentStyle={{width: "80%", height: "100%", maxHeight: "none", maxWidth: "none", fontSize: "10px"}}
          actions={actions} open={this.state.open} >
          <div>
            <div style={styles.wrapper}>
              <TextField
                floatingLabelText="Name"
                id="name"
                value={this.state.name}
                onChange={this.handleChange}
                name="Name"
                />
              <TextField
                floatingLabelText="Description"
                id="description"
                value={this.state.description}
                onChange={this.handleChange}
                name="Description"
                />
            </div>
            <Divider/>
          </div>
          {/* diplay categories */}
          <h4>Categories</h4>
          <div style={styles.wrapper}>
            <ListGroup>
              {templateAllCategories}
            </ListGroup>
            <ListGroup>
              {templateStoredCategories}
            </ListGroup>
          </div>
        </Dialog>
      </div>
    );
  }
}
