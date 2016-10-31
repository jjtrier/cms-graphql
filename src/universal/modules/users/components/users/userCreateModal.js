import React, {Component, PropTypes} from 'react';
import {TextField, Divider, SelectField, MenuItem, RaisedButton} from 'material-ui';
import Modal from 'react-modal';
import ModalButtons from '../../../../components/modalButtons/modalButtons.js';
import {green500} from 'material-ui/styles/colors';
import {createUser} from '../../ducks/users.js';
import styles from './users.css';

export default class UserCreateModal extends Component {

  static propTypes = {
    user: PropTypes.object,
    usertypes: PropTypes.array,
    dispatch: PropTypes.func,
    open: PropTypes.bool,
    modal: PropTypes.bool
  }
  state = {
    open: false,
    name: '',
    email: '',
    usertype: 'admin',
    active: true,
    password: '',
    passwordCheck: '',
    usertypes: this.props.usertypes,
    errorText: '',
    modal: this.props.modal
  };

  initialState = {
    name: '',
    email: '',
    usertype: 'admin',
    active: true,
    password: '',
    passwordCheck: '',
    errorText: '',
  };

  handleChange = event => {
    const lineKey = event.target.id;
    if (this.state.passwordCheck === this.state.password) {
      this.setState({errorText: ''});
    } else {
      this.setState({errorText: 'Passwords need to match'});
    }
    this.setState({
      [lineKey]: event.target.value
    });
  };

  handleChangeUserType = (event, index, value) => this.setState({usertype: value});
  handleChangeActive = (event, index, value) => this.setState({active: value});
  handleKeyPress = event => {
    if (event.key === 'Enter') {
      console.log('enter press here! ');
    }
  };
  handleOpen = () => {
    this.setState({open: true});
  };
// this block sends the new information out on submit
  handleSubmit = () => {
    if (this.state.modal) {
      this.setState({open: false});
    }
    // this maps the string for usertype back to an integer for Id
    let usertypeId = 0;
    for (let i = 0; i < this.props.usertypes.length; i++) {
      if (this.state.usertype === this.props.usertypes[i].name) {
        usertypeId = this.props.usertypes[i].id;
      }
    }
    let newUserInfo = {
      name: this.state.name,
      email: this.state.email,
      usertype: usertypeId,
      active: this.state.active
    };
    if (this.state.password !== '' && (this.state.password === this.state.passwordCheck)) {
      newUserInfo.password = this.state.password;
    }
    this.props.dispatch(createUser(newUserInfo));
  };

  handleClose = () => {
    if (this.state.modal) {
      this.setState({open: false});
    }
    this.setState(this.initialState);
  };
  render() {
    let wrapper;
    // this maps the usertypes array to possible choices in pulldown
    let userTypeItems = this.props.usertypes.map((usertype, idx) => {
      let usertypeCapped = usertype.name.substr(0, 1).toUpperCase() + usertype.name.substr(1);
      return (
        <MenuItem key={idx} value={usertype.name} primaryText={usertypeCapped}/>
      );
    });
    let innerWorkings = (
      <div>
        <TextField
          floatingLabelText="Name"
          id="name"
          value={this.state.name}
          onChange={this.handleChange}
          name="Name"
          />
        <Divider/>
        <TextField
          floatingLabelText="Email"
          id="email"
          value={this.state.email}
          onChange={this.handleChange}
          />
        <Divider/>
        <SelectField value={this.state.usertype} id="usertypeSel" onChange={this.handleChangeUserType} floatingLabelText="User Type">
          {userTypeItems}
        </SelectField>
        <Divider/>
        <SelectField value={this.state.active}
          id="activeSel"
          onChange={this.handleChangeActive}
          floatingLabelText="Active Status">
          <MenuItem key={1} value={true} primaryText={'Active'}/>
          <MenuItem key={2} value={false} primaryText={'Inactive'}/>
        </SelectField>
          <Divider/>
        <TextField
          floatingLabelText="Enter New Password"
          id="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <Divider/>
        <TextField
          floatingLabelText="Confirm New Password"
          id="passwordCheck"
          value={this.state.passwordCheck}
          onChange={this.handleChange}
          errorText={this.state.errorText}
          onKeyDown={this.handleKeyPress}
        />
      </div>
    );
    if (this.state.modal) {
      wrapper = (
        <div>
          <div>
            <RaisedButton
              labelStyle={{fontSize: '12px', lineHeight: '12px', textTransform: 'none', textAlign: 'center'}}
              style={{height: '28px', width: '50px'}}
              label="New User"
              onTouchTap={this.handleOpen}
              backgroundColor={green500}
              labelColor="white"/>
          </div>
          <Modal
            isOpen={this.state.open}
            onRequestClose={this.handleClose}
            shouldCloseOnOverlayClick={false}
            overlayClassName={styles.OverlayClass}
            contentLabel="Create a New User Test!">
            <h2>Create New User</h2>
            {innerWorkings}
            <div className={styles.buttonGroup}>
              <ModalButtons
                onHandleCancel={this.handleClose}
                onHandleSubmit={this.handleSubmit}
                submitLabel="Create New User"
                />
            </div>
          </Modal>
        </div>
      );
    } else {
      wrapper = (
        <div>
          <h2>Create New User</h2>
            {innerWorkings}
            <div className={styles.buttonGroup}>
              <ModalButtons
                onHandleCancel={this.handleClose}
                onHandleSubmit={this.handleSubmit}
                submitLabel="Create New User"
                />
            </div>
        </div>
      );
    }

    return (
      <div>
        {wrapper}
      </div>
    );
  }
}
