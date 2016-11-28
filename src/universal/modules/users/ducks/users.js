import {fromJS, Map as iMap, List as iList} from 'immutable';
import {fetchGraphQL} from '../../../utils/fetching';
import {getAllUsers} from '../../projects/ducks/projects.js';

export const GET_USERS = 'GET_USERS';
export const GET_USERTYPES = 'GET_USERTYPES';
export const UPDATE_USER = 'UPDATE_USER';
export const CREATE_USER = 'CREATE_USER';
export const DELETE_USER = 'DELETE_USER';

export const USERS = 'users';

const initialState = iMap({
  users: iList(),
  usertypes: iList(),
  user: iMap()
});

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return state.merge({
        users: fromJS(action.payload)
      });
    case GET_USERTYPES:
      return state.merge({
        usertypes: fromJS(action.payload)
      });
    case UPDATE_USER:
      return state.merge({
        user: fromJS(action.payload)
      });
    case CREATE_USER:
      return state.merge({
        user: fromJS(action.payload)
      });
    case DELETE_USER:
      return state.merge({
        user: fromJS(action.payload)
      });
    default:
      return state;
  }
}
// get all users
//
export function getUsers(sendBack) {
  const userSchema =
  `
    {
      email,
      id,
      name,
      active,
      permissions,
      usertype
    }
  `;
  return async(dispatch, getState) => {
    const query = `
        query {
          getAllUsers
          ${userSchema}
        }`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    }
    if (sendBack) {
      return data.getAllUsers;
    }
    else {
      dispatch({
        type: GET_USERS,
        payload: data.getAllUsers
      });
    }
  };
}
// get all Usertypes
//
export function getAllUserTypes() {
  const userTypeSchema =
  `
    {
      id,
      name
    }
  `;
  return async(dispatch, getState) => {
    const query = `
        query {
          getAllUserTypes
          ${userTypeSchema}
        }`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      dispatch({
        type: GET_USERTYPES,
        payload: data.getAllUserTypes
      });
    }
  };
}
// create a User
//
export function createUser(user, refreshSetting) {
  const userMutation =
  `
  (
    name:"${user.name}",
    active:${user.active},
    usertype:${user.usertype},
    email:"${user.email}",
    password:"${user.password}"
  )
  `;
  const userSchema =
  `
    {
      authToken
    }
  `;
  return async(dispatch, getState) => {
    const query = `
        mutation {
          createUser
          ${userMutation}
          ${userSchema}
        }`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      console.log('inside createUser callback inside users.js');
      await dispatch({
        type: CREATE_USER,
        payload: data.createUser
      });
      if (refreshSetting) {
        // send out a call to refresh users inside projects ducks
        console.log('inside create user, now dispatching getAllUsers');
        await dispatch(getAllUsers());
      } else {
        await dispatch(getUsers());
      }
    }
  };
};
// update a user
//
export function updateUser(user) {
  const userMutation =
  `
  (
    id:${user.id},
    name:"${user.name}",
    active:${user.active},
    usertype:${user.usertype},
    email:"${user.email}"
  )
  `;
  const userSchema =
  `
    {
      email,
      id,
      name,
      active,
      permissions,
      usertype
    }
  `;
  return async(dispatch, getState) => {
    const query = `
        mutation {
          updateUser
          ${userMutation}
          ${userSchema}
        }`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      await dispatch({
        type: UPDATE_USER,
        payload: data.updateUser
      });
      await dispatch(getUsers());
    }
  };
};
// delete a User
//
export function deleteUser(id) {
  const userMutation =
  `(id:${id})`;
  const userSchema =
  `{id}`;
  return async(dispatch, getState) => {
    const query = `
        mutation {deleteUser${userMutation}${userSchema}}`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      await dispatch({
        type: DELETE_USER,
        payload: data.deleteUser
      });
      await dispatch(getUsers());
    }
  };
};
