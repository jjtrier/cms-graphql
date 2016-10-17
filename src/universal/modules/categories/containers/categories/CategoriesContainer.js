import React, {Component, PropTypes} from 'react';
import Categories from '../../components/categories/categories';
import {getAllCategories} from '../../ducks/categoriesDucks.js';
import {loginToken} from '../../../auth/ducks/auth.js'
import {connect} from 'react-redux';

import {ensureState} from 'redux-optimistic-ui';

@connect(mapStateToProps, mapDispatchToProps)
export default class CategoriesContainer extends Component {
  static propTypes = {
    auth: PropTypes.object,
    dispatch: PropTypes.func,
    categories: PropTypes.object
  }

  constructor(props) {
    super(props);
    const {dispatch} = props;
    dispatch(loginToken());
    dispatch(getAllCategories());
    // dispatch(getDatatypes());
  }
  render() {
    return <Categories {...this.props} {...this.props.categories} {...this.props.auth}/>;
  }
}

function mapStateToProps(state) {
  state = ensureState(state);
  // console.log('stuff', state.get('fields').toJS());
  return {
    categories: state.get('categories').toJS(),
    auth: state.get('auth').toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}
