import React, {Component, PropTypes} from 'react';
import {FlatButton, TextField, Divider} from 'material-ui';
import {blue300, green200} from 'material-ui/styles/colors';
import Modal from 'react-modal';
import ModalButtons from '../../../../components/modalButtons/modalButtons.js';
import {updateProject} from '../../ducks/projects.js';
import UserCreateModal from '../../../users/components/users/userCreateModal.js';
import {Button, ListGroup, ListGroupItem, Tabs, Tab, SplitButton, MenuItem, FormControl} from 'react-bootstrap';
import styles from './modalStyles.css';
import {mapUsers, ButtonBuilder} from './subComponents/mapUsers';
import {chosenChecker, idsFromArrayOfObjects} from './subComponents/utilityFunctions';
import {DeletableChip, AddableChip} from './subComponents/subComponents.js';

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
    filterUserValue: '',
    users: this.props.project.users
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
  // this handles the opening of then main project edit modal
  handleOpen = () => {
    this.setState({open: true});
  };
// this handles the submit button to edit the Project
  handleSubmit = () => {
    this.setState({open: false});

    let newProjectInfo = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      categories: idsFromArrayOfObjects(this.state.categories),
      users: idsFromArrayOfObjects(this.state.users)
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
    // following is function to handle adding users to the current project
    const addUserToProject = newUserInput => {
      let previousStateUsers = this.state.users;
      previousStateUsers.push(newUserInput);
      this.setState(
        {users: previousStateUsers}
      );
    }
    // following is function to handle removing users from the current project
    const removeUserFromProject = removeUserInput => {
      let previousStateUsers = this.state.users;
      previousStateUsers = previousStateUsers.filter(user => {
        return (user.id !== removeUserInput.id)
      });
      this.setState(
        {users: previousStateUsers}
      );
    }
    // available users
    // templatize all available users to be buttons in Component
    let allUsers = this.props.users;
    allUsers = allUsers.filter(user => {
      const userName = user.name.toLowerCase();
      return (userName.includes(this.state.filterUserValue));
    });
// mapUsers is used to build a user list item, with all of the yummy actions added to is
    const arrayOfAvailableUserActions = [
      {action: addUserToProject,
        title: "Add To Project"
      }
    ];
    let templateAllUsers = mapUsers(allUsers, arrayOfAvailableUserActions);
    const editProjectName = (`Edit Project: ${this.state.id}`);
    // users that are on the project
    // templatize all chosen users to be buttons in Component
    const arrayOfChosenUserActions = [
      {action: removeUserFromProject,
        title: "Remove From Project"
      }
    ];
    let templateUsersOnProject = mapUsers(this.state.users, arrayOfChosenUserActions);

    let that = this;
    //
    // this is the main block of html for the edit project modal
    //
    return (
      <div>
        <Button bsStyle="info" bsSize="xsmall" onTouchTap={this.handleOpen}>Edit Project</Button>
          <Modal
            isOpen={this.state.open}
            onRequestClose={this.handleClose}
            shouldCloseOnOverlayClick={false}
            overlayClassName={styles.OverlayClass}
            contentLabel="Edit Project Test!">
          <div>
            <h2>{editProjectName}</h2>
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
                  <UserCreateModal
                    usertypes={this.props.usertypes}
                    dispatch={this.props.dispatch}
                    refreshOnReturn={true}
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
                  <ListGroupItem >Users On Project</ListGroupItem>
                  {templateUsersOnProject}
                </ListGroup>
              </div>
            </Tab>
          </Tabs>
          <div className={styles.buttonGroup}>
            <ModalButtons
              onHandleCancel={this.handleClose}
              onHandleSubmit={this.handleSubmit}
              submitLabel="Submit Project Edit"
              />
          </div>
        </Modal>
      </div>
    );
  }
}
