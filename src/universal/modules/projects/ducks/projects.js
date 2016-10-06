import {fromJS, Map as iMap, List as iList} from 'immutable';
import {fetchGraphQL} from '../../../utils/fetching';

export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECTS_BY_USER = 'GET_PROJECTS_BY_USER';
export const SET_PROJECT = 'SET_PROJECT';

export const PROJECTS = 'projects';

const initialState = iMap({
  projects: iList(),
  project: iMap()
});

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return state.merge({
        projects: fromJS(action.payload)
      });
    case GET_PROJECTS_BY_USER:
      return state.merge({
        projects: fromJS(action.payload)
      });
    case SET_PROJECT:
      return state.merge({
        project: fromJS(action.payload)
      });
    default:
      return state;
  }
}
//
export function getAllProjects() {
  const projectSchema =
  `{
      id,
      name,
      description
    }
  `;
  return async(dispatch, getState) => {
    const query = `
        query {
          getAllProjects
          ${projectSchema}
        }`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      dispatch({
        type: GET_PROJECTS,
        payload: data.getAllProjects
      });
    }
  };
}
// get projects related to a user
export function getUsersProjectsById(id) {
  // const projectSchema =
  // `{
  //     id,
  //     name,
  //     description
  //   }
  // `;
  const projectSchema =
  `{
    id
    name
    description
    categories{id,name,visible,
      entries{id,title,projectId,datatypeId,visible,data,categoryId}
      datatype{
      id
      name
      description
      visible
        fields{
          id
          name
          description
      }
    }}
  }`;
  return async dispatch => {
    if (!id) {
      dispatch({
        type: GET_PROJECTS_BY_USER,
        payload: []
      });
      return;
    }
    const query = `
        query {
          getUsersProjectsById(id: ${id})
          ${projectSchema}
        }`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      dispatch({
        type: GET_PROJECTS_BY_USER,
        payload: data.getUsersProjectsById
      });
    }
  };
}
export function setProject(project) {
  return {
    type: SET_PROJECT,
    payload: project
  };
}
