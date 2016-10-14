import React, {Component, PropTypes} from 'react';
import Projects from '../../components/projects/projects';
import {getAllProjects, getUsersProjectsById, getAllCategories} from '../../ducks/projects.js';
import {loginToken} from '../../../auth/ducks/auth.js'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {ensureState} from 'redux-optimistic-ui';

@connect(mapStateToProps, mapDispatchToProps)
export default class ProjectsContainer extends Component {
  static propTypes = {
    auth: PropTypes.object,
    dispatch: PropTypes.func,
    data: PropTypes.object,
    params: PropTypes.object
  }

  constructor(props) {
    super(props);
    const {dispatch} = props;
    // dispatch(getAllProjects());
    dispatch(loginToken());
    dispatch(getAllCategories());
    // dispatch(getAllProjects());
    // dispatch(getUsersProjectsById(props.auth.user.id));
    dispatch(getUsersProjectsById(Number(this.props.params.user) || props.auth.user.id));
  }
  render() {
    return <Projects {...this.props} {...this.props.data} {...this.props.auth}/>;
  }
}

function mapStateToProps(state) {
  state = ensureState(state);
  // console.log('state',state);
  return {
    data: state.get('projects').toJS(),
    auth: state.get('auth').toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}
