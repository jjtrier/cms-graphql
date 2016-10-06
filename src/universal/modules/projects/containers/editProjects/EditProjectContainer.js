import React, {Component, PropTypes} from 'react';
import EditProject from '../../components/editProject/editProject';
// import {getAllProjects, getUsersProjectsById} from '../../ducks/projects.js';
import {loginToken} from '../../../auth/ducks/auth.js'
// import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {ensureState} from 'redux-optimistic-ui';

@connect(mapStateToProps, mapDispatchToProps)
export default class ProjectsContainer extends Component {
  static propTypes = {
    auth: PropTypes.object,
    dispatch: PropTypes.func,
    project: PropTypes.object
  }

  constructor(props) {
    super(props);
    const {dispatch} = props;
    dispatch(loginToken());
  }

  render() {
    return (
      <div>
        <h1>Inside Container</h1>
      <EditProject {...this.props} {...this.props.project} {...this.props.auth}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  state = ensureState(state);
  // console.log('state',state);
  return {
    project: state.get('project').toJS(),
    auth: state.get('auth').toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}
