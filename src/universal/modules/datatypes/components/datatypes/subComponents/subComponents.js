import React, {Component, PropTypes} from 'react';
import Chip from 'material-ui/Chip';
import {styles} from '../modalStyles.js';

export const DeletableChip = React.createClass({
  propTypes: {
    onDeleteClick: PropTypes.func,
    field: PropTypes.object
  },
  render() {
    return (
      <Chip
        onRequestDelete={this._onClick}
        style={styles.chip}>
        {this.props.field.name}
      </Chip>
    );
  },
  _onClick() {
    this.props.onDeleteClick(this.props.field.id);
  }
});
