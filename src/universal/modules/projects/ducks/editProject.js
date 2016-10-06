import {fromJS, Map as iMap, List as iList} from 'immutable';
import {fetchGraphQL} from '../../../utils/fetching';

export const SET_PROJECT = 'SET_PROJECT';

export const PROJECTS = 'projects';

const initialState = iMap({
  project: iMap()
});

export function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECT:
      return state.merge({
        project: fromJS(action.payload)
      });
    default:
      return state;
  }
}
//
export function setProject(project) {
  return {
    type: SET_PROJECT,
    payload: project
  };
}
