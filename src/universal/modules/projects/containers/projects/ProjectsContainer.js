import React, {Component, PropTypes} from 'react';
import Projects from '../../components/projects/projects';
import {getAllProjects, getUsersProjectsById} from '../../ducks/projects.js';
import {loginToken} from '../../../auth/ducks/auth.js'
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
    dispatch(loginToken());
    // dispatch(getAllCategories());
    dispatch(getAllProjects());
    // use below if setting up to only show projects related to a user
    // dispatch(getUsersProjectsById(Number(this.props.params.user) || props.auth.user.id));
  }
  render() {
    return <Projects {...this.props} {...this.props.data} {...this.props.auth}/>;
  }
}

function mapStateToProps(state) {
  state = ensureState(state);
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
