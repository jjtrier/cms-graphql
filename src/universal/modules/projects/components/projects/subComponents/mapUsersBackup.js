import React, {Component, PropTypes} from 'react';
import Chip from 'material-ui/Chip';
import styles from '../modalStyles.css';
import {blue300} from 'material-ui/styles/colors';
import {Button, ListGroup, ListGroupItem, Tabs, Tab, SplitButton, MenuItem, FormControl} from 'react-bootstrap';

// this utility function is used in building each user that is listed in project edit projectmodal
// the action and the actionTitle define what is listed in the pop up menu lines for each user
export const mapUsers = (userList, actionOne, actionOneTitle) => {
  return userList.map((user, idx) => {
    let backgroundColor = blue300;
    return (
      <ListGroupItem key={idx}>
        <SplitButton title={user.name} pullRight id={user.id}>
          <MenuItem eventKey="1">
            <ButtonBuilder
              user={user}
              onItemClick={actionOne}
              buttonTitle={actionOneTitle}
              >
            </ButtonBuilder>

          </MenuItem>
          <MenuItem eventKey="2">Another action</MenuItem>
          <MenuItem eventKey="3">Something else here</MenuItem>
        </SplitButton>
      </ListGroupItem>
    );
  });
};

export const ButtonBuilder = React.createClass({
  propTypes: {
    onItemClick: PropTypes.func,
    user: PropTypes.object,
    buttonTitle: PropTypes.string
  },
  render() {
    return (
      <Button bsStyle="primary" bsSize="xsmall" onClick={this._onClick}>{this.props.buttonTitle}</Button>
    );
  },
  _onClick() {
    this.props.onItemClick(this.props.user);
  }
});
