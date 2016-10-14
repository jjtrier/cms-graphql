import React, {Component, PropTypes} from 'react';
import Fields from '../../components/fields/fields';
import {getFields} from '../../ducks/fieldsDucks.js';
import {loginToken} from '../../../auth/ducks/auth.js'
import {connect} from 'react-redux';

import {ensureState} from 'redux-optimistic-ui';

@connect(mapStateToProps, mapDispatchToProps)
export default class FieldsContainer extends Component {
  static propTypes = {
    auth: PropTypes.object,
    dispatch: PropTypes.func,
    fields: PropTypes.object
  }

  constructor(props) {
    super(props);
    const {dispatch} = props;
    dispatch(loginToken());
    dispatch(getFields());
  }
  render() {
    return <Fields {...this.props} {...this.props.fields} {...this.props.auth}/>;
  }
}

function mapStateToProps(state) {
  state = ensureState(state);
  // console.log('stuff', state.get('fields').toJS());
  return {
    fields: state.get('fields').toJS(),
    auth: state.get('auth').toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}
