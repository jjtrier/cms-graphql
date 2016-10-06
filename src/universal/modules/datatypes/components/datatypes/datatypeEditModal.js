import React, {Component, PropTypes} from 'react';
import {Dialog, FlatButton, TextField, Divider, SelectField, MenuItem} from 'material-ui';
import {updateUser} from '../../ducks/users.js';
import {Button} from 'react-bootstrap';
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class UserEditModal extends Component {

  static propTypes = {
    user: PropTypes.object,
    usertypes: PropTypes.array,
    dispatch: PropTypes.func
  }
  state = {
    open: false,
    id: this.props.user.id,
    name: this.props.user.name,
    email: this.props.user.email,
    usertype: this.props.user.usertype,
    active: this.props.user.active,
    password: '',
    passwordCheck: '',
    usertypes: this.props.usertypes,
    errorText: ''
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

  handleOpen = () => {
    this.setState({open: true});
  };

  handleSubmit = () => {
    this.setState({open: false});
    console.log('this.state from submit', this.state);
    // this maps the string for usertype back to an integer for Id
    let usertypeId = 0;
    for (var i = 0; i < this.props.usertypes.length; i++) {
      if(this.state.usertype === this.props.usertypes[i].name){
        usertypeId = this.props.usertypes[i].id;
      }
    }
    let newUserInfo = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      usertype: usertypeId,
      active: this.state.active
    };
    if (this.state.password !== '' && (this.state.password === this.state.passwordCheck)) {
      newUserInfo.password = this.state.password;
    }
    this.props.dispatch(updateUser(newUserInfo));
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    // this maps the usertypes array to possible choices in pulldown
    let userTypeItems = this.state.usertypes.map((usertype, idx) => {
      let usertypeCapped = usertype.name.substr(0, 1).toUpperCase() + usertype.name.substr(1);
      return (
        <MenuItem key={idx} value={usertype.name} primaryText={usertypeCapped}/>
      );
    });
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

    return (
      <div>
        <Button bsStyle="info" bsSize="xsmall" onTouchTap={this.handleOpen}>Edit</Button>
        <Dialog
          title="Edit User"
          autoDetectWindowHeight={false}
          autoScrollBodyContent={false}
          contentStyle={{width: "100%", maxHeight: "none"}}
          actions={actions} open={this.state.open} >
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
            <SelectField value={this.state.active} id="activeSel" onChange={this.handleChangeActive} floatingLabelText="Active Status">
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
            />
          </div>
        </Dialog>
      </div>
    );
  }
}
