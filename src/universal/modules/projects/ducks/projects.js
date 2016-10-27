import {fromJS, Map as iMap, List as iList} from 'immutable';
import {fetchGraphQL} from '../../../utils/fetching';

export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECTS_BY_USER = 'GET_PROJECTS_BY_USER';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_ALL_USERTYPES = 'GET_ALL_USERTYPES';

export const PROJECTS = 'projects';

const initialState = iMap({
  projects: iList(),
  project: iMap(),
  categories: iList(),
  users: iList(),
  usertypes: iList()
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
    case UPDATE_PROJECT:
      let previousStateProjects = state.get('projects').toJS();
      previousStateProjects = previousStateProjects.filter(project => {
        return (project.id !== action.payload.id);
      })
      return state.merge({
        projects: fromJS(previousStateProjects.concat(action.payload))
      });
    case GET_CATEGORIES:
      return state.merge({
        categories: fromJS(action.payload)
      });
    case GET_ALL_USERS:
      return state.merge({
        users: fromJS(action.payload)
      });
    case GET_ALL_USERTYPES:
      return state.merge({
        usertypes: fromJS(action.payload)
      });
    case DELETE_PROJECT:
    default:
      return state;
  }
}
//
export function getAllProjects() {
  const projectSchema =
  `{
    id
    name
    description
    users{id,name, email, usertype}
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
          dataJSON
      }
    }}
  }`;
  return async(dispatch, getState) => {
    const query = `
        query {
          getAllProjects
          ${projectSchema}getAllUsers{id,name,email,usertype}
        }`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      console.log('made it here', data.getAllProjects);
      dispatch({
        type: GET_PROJECTS,
        payload: data.getAllProjects
      });
      dispatch({
        type: GET_ALL_USERS,
        payload: data.getAllUsers
      });
    }
  };
}
// get projects related to a user
export function getUsersProjectsById(id) {
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
          dataJSON
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
          getAllUsers{id,name,email,usertype}
          getAllUserTypes{id,name,permissions{id,name}}
        }`;
    const {error, data} = await fetchGraphQL({query});
    console.log('data.getAllUserTypes', data.getAllUserTypes);
    if (error) {
      console.error(error);
    } else {
      dispatch({
        type: GET_PROJECTS_BY_USER,
        payload: data.getUsersProjectsById
      });
      dispatch({
        type: GET_ALL_USERS,
        payload: data.getAllUsers
      });
      dispatch({
        type: GET_ALL_USERTYPES,
        payload: data.getAllUserTypes
      });
    }
  };
}
// update a project
export function updateProject(id, variables) {
  const projectMutation =
  `(
    id: $id,
    name: $name,
    description: $description,
    categories: $categories
  )`;
  const projectSchema = `{id,name,description,categories{id,name}}`;
  return async(dispatch, getState) => {
    const query = `
        mutation M($id: Int!, $name: String, $description: String, $categories: [Int]){
          updateProject
          ${projectMutation}
          ${projectSchema}
        }`;
    const {error, data} = await fetchGraphQL({query, variables});
    if (error) {
      console.error(error);
    } else {
      await dispatch({
        type: UPDATE_PROJECT,
        payload: data.updateProject
      });
      // await dispatch(getUsersProjectsById(id));
    }
  };
}
// delete a Project
export function deleteProject(id, userId) {
  const projectMutation =
  `(id:${id})`;
  const projectSchema =
  `{id}`;
  return async(dispatch, getState) => {
    const query = `
        mutation {deleteProject${projectMutation}${projectSchema}}`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      await dispatch({
        type: DELETE_PROJECT,
        payload: data.deleteProject
      });
      await dispatch(getUsersProjectsById(userId));
    }
  };
}
//
export function getAllCategories() {
  const categorySchema =
  `{id,name,visible,entries{id,title}}`;
  return async(dispatch, getState) => {
    const query = `
        query {
          getAllCategories
          ${categorySchema}
        }`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      dispatch({
        type: GET_CATEGORIES,
        payload: data.getAllCategories
      });
    }
  };
}
