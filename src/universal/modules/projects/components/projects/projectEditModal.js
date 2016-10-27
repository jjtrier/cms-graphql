import React, {Component, PropTypes} from 'react';
import {Dialog, FlatButton, TextField, Divider} from 'material-ui';
import {blue300, green200} from 'material-ui/styles/colors';
import {updateProject} from '../../ducks/projects.js';
import UserCreateModal from '../../../users/components/users/userCreateModal.js';
import {Button, ListGroup, ListGroupItem, Tabs, Tab, SplitButton, MenuItem, FormControl} from 'react-bootstrap';
import styles from './modalStyles.css';

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
  constructor(props) {
    super(props);
    window.addEventListener('keydown', this._handleEscKey, false);
  }
  static propTypes = {
    project: PropTypes.object,
    auth: PropTypes.object,
    categories: PropTypes.array,
    users: PropTypes.array,
    dispatch: PropTypes.func,
    usertypes: PropTypes.array
  }
  state = {
    tabKey: 1,
    open: false,
    id: this.props.project.id,
    name: this.props.project.name,
    description: this.props.project.description,
    categories: this.props.project.categories,
    errorText: '',
    filterUserValue: ''
  };
  _handleEscKey = event => {
    if (event.keyCode === 27) {
      this.handleClose();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleEscKey, false);
  }
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
  handleCategoryChipAdd = category => {
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
  // this handles setting which tab is selected
  handleSelectTab = key => {
    this.setState({
      tabKey: key
    });
  }

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
    //
    // templatize the fields to be chips in Component
    const self = this;
    let categories = this.state.categories;
    let templateStoredCategories = categories.map((category, idx) => {
      return (
        <ListGroupItem key={idx}>
          <DeletableChip category={category} onDeleteClick={self.handleRequestChipDelete}></DeletableChip>
        </ListGroupItem>
      );
    });
    //
    // templatize all available categories to be chips in Component
    let allCategories = this.props.categories;
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
            onAddClick={self.handleCategoryChipAdd}>
          </AddableChip>
        </ListGroupItem>
      );
    });
    // available users
    // templatize all available users to be buttons in Component
    let allUsers = this.props.users;
    allUsers = allUsers.filter(user => {
      const userName = user.name.toLowerCase();
      return (userName.includes(this.state.filterUserValue));
    });
    // console.log('befpre', allUsers);
    // allUsers = allUsers.sort((a, b) => {
    //   const alastName = a.name.split(' ')[0];
    //   const blastName = b.name.split(' ')[0];
    //   if (alastName > blastName) {
    //     return -1}
    //   if (alastName < blastName) {
    //     return 1}
    //   else return 0;
    // });
    // console.log(allUsers);

    let templateAllUsers = allUsers.map((user, idx) => {
      let backgroundColor = blue300;
      return (
        <ListGroupItem key={idx}>
          <SplitButton title={user.name} pullRight id={user.id}>
            <MenuItem eventKey="1">Action</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem eventKey="3">Something else here</MenuItem>
          </SplitButton>
        </ListGroupItem>
      );
    });
    const editProjectName = (`Edit Project: ${this.state.id}`);
    let that = this;
    //
    // this is the main block of html for the edit project modal
    //
    console.log('usertypes', this.props.usertypes);
    return (
      <div>
        <Button bsStyle="info" bsSize="xsmall" onTouchTap={this.handleOpen}>Edit Project</Button>
        <Dialog
          title={editProjectName}
          contentStyle={{width: "80%", height: "100%", maxHeight: "none", maxWidth: "none", fontSize: "10px"}}
          actions={actions} open={this.state.open} >

          <div>
            <div className={styles._wrapper}>
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

          <Tabs activeKey={this.state.tabKey} onSelect={that.handleSelectTab} id="project-edit-tabs">

            <Tab eventKey={1} title="Categories">
              <div className={styles._wrapper}>
                <ListGroup>
                  <ListGroupItem >Available Categories</ListGroupItem>
                  {templateAllCategories}
                </ListGroup>
                <ListGroup>
                  {templateStoredCategories}
                </ListGroup>
              </div>
            </Tab>

            <Tab eventKey={2} title="Users">
              <div className={styles._wrapper}>
                <Button
                  bsStyle="success"
                  bsSize="xsmall"
                  onTouchTap={this.handleOpen}
                  className={styles._newUserButton}
                  >New User</Button>
                  <UserCreateModal
                    usertypes={this.props.usertypes}
                    dispatch={this.props.dispatch}
                    modal={true}/>
                <ListGroup>
                  <ListGroupItem >Available Users</ListGroupItem>
                   <FormControl
                     type="text"
                     id="filterUserValue"
                     value={this.state.filterUserValue}
                     placeholder="Search Me"
                     onChange={this.handleChange}/>
                  {templateAllUsers}
                </ListGroup>
                <ListGroup>
                  {templateAllUsers}
                </ListGroup>
              </div>
            </Tab>
          </Tabs>

        </Dialog>
      </div>
    );
  }
}
