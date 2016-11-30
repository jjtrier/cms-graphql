import React, {Component, PropTypes} from 'react';
import Chip from 'material-ui/Chip';
import styles from '../modalStyles.css';
import {blue300} from 'material-ui/styles/colors';
import {Button, ListGroup, ListGroupItem, Tabs, Tab, SplitButton, MenuItem, FormControl} from 'react-bootstrap';

// this utility function is used in building each user that is listed in project edit projectmodal
// the action and the actionTitle define what is listed in the pop up menu lines for each user
export const mapUsers = (userList, actionsArrayIncoming) => {
  // below maps through the userlist
  return userList.map((user, idx) => {
    // below maps through the possible split button actions that were sent in
    let menuItems = actionsArrayIncoming.map((action, idx2) => {
      return menuItemBuilder(idx2, user, action['action'], action['title'])
    });

    return (
      <ListGroupItem key={idx}>
        <SplitButton title={user.name} pullRight id={user.id}>
          {menuItems}
        </SplitButton>
      </ListGroupItem>
    );
  });
};

const menuItemBuilder = (eventKey, user, action, actionTitle) => {
  return (
    <MenuItem eventKey={eventKey}>
      <ButtonBuilder
        user={user}
        onItemClick={action}
        buttonTitle={actionTitle}
        >
      </ButtonBuilder>
    </MenuItem>
  );
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
