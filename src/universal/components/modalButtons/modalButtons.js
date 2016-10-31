import React, {Component, PropTypes} from 'react';
import {RaisedButton} from 'material-ui';
import {yellow400, green700} from 'material-ui/styles/colors';
import styles from './modalButtons.css';

export default class ModalButtons extends Component {
  static propTypes = {
    onHandleCancel: PropTypes.func,
    onHandleSubmit: PropTypes.func,
    submitLabel:  PropTypes.string
  }
  render() {
    return (
      <div>
        <RaisedButton
          label="Cancel"
          labelStyle={{fontSize: '16px', lineHeight: '16px', textTransform: 'none'}}
          onTouchTap={this.props.onHandleCancel}
          className={styles.cancelButton}
          backgroundColor={yellow400}/>
        <RaisedButton
          label={this.props.submitLabel}
          labelStyle={{fontSize: '16px', lineHeight: '16px', textTransform: 'none'}}
          onTouchTap={this.props.onHandleSubmit}
          backgroundColor={green700}
          labelColor="white"/>
      </div>
  );
  }
}
