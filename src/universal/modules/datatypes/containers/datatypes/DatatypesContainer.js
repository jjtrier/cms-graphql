import React, {Component, PropTypes} from 'react';
import Datatypes from '../../components/datatypes/datatypes';
import {getDatatypes, getFields} from '../../ducks/datatypesDucks.js';
import {loginToken} from '../../../auth/ducks/auth.js';
import {connect} from 'react-redux';

import {ensureState} from 'redux-optimistic-ui';

@connect(mapStateToProps, mapDispatchToProps)
export default class DatatypesContainer extends Component {
  static propTypes = {
    auth: PropTypes.object,
    dispatch: PropTypes.func,
    datatypes: PropTypes.object
  }

  constructor(props) {
    super(props);
    const {dispatch} = props;
    dispatch(loginToken());
    dispatch(getDatatypes());
    dispatch(getFields());
  }
  render() {
    return <Datatypes {...this.props} {...this.props.datatypes} {...this.props.auth}/>;
  }
}

function mapStateToProps(state) {
  state = ensureState(state);
  // console.log('stuff', state.get('datatypes').toJS());
  return {
    datatypes: state.get('datatypes').toJS(),
    auth: state.get('auth').toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}
