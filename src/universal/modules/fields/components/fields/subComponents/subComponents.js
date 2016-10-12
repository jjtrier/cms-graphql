import React, {Component, PropTypes} from 'react';
import Chip from 'material-ui/Chip';
import {styles} from '../modalStyles.js';
import {green200} from 'material-ui/styles/colors';

export const DeletableChip = React.createClass({
  propTypes: {
    onDeleteClick: PropTypes.func,
    field: PropTypes.object
  },
  render() {
    return (
      <Chip
        onRequestDelete={this._onClick}
        backgroundColor={green200}
        style={styles.chip}>
        {this.props.field.name}
      </Chip>
    );
  },
  _onClick() {
    this.props.onDeleteClick(this.props.field.id);
  }
});

export const AddableChip = React.createClass({
  propTypes: {
    onAddClick: PropTypes.func,
    field: PropTypes.object,
    backgroundColor: PropTypes.string,
    count: PropTypes.number
  },
  render() {
    console.log('this.props.count', this.props.count);
    let count = `(${this.props.count})`;
    if (this.props.count <= 1) {
      count = null
    }
    return (
      <Chip
        onTouchTap={this._onClick}
        backgroundColor={this.props.backgroundColor}
        style={styles.chip}>
        {this.props.field.name} {count}
      </Chip>
    );
  },
  _onClick() {
    this.props.onAddClick(this.props.field);
  }
});
