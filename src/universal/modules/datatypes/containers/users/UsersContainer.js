import React, {Component} from 'react';
import Users from '../../components/users/users';
import {getUsers, getAllUserTypes} from '../../ducks/users.js';
import {loginToken} from '../../../auth/ducks/auth.js'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {ensureState} from 'redux-optimistic-ui';

@connect(mapStateToProps, mapDispatchToProps)
export default class UsersContainer extends Component {
  constructor(props) {
    super(props);
    const {dispatch} = props;
    dispatch(loginToken());
    dispatch(getUsers());
    dispatch(getAllUserTypes());
  }
  render() {
    return <Users {...this.props} {...this.props.data} {...this.props.auth}/>;
  }
}

function mapStateToProps(state) {
  state = ensureState(state);
  // console.log('state',state);
  return {
    data: state.get('users').toJS(),
    auth: state.get('auth').toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}
