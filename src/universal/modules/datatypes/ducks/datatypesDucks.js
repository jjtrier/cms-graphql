import {fromJS, Map as iMap, List as iList} from 'immutable';
import {fetchGraphQL} from '../../../utils/fetching';

export const GET_DATATYPES = 'GET_DATATYPES';
export const UPDATE_DATATYPE = 'UPDATE_DATATYPE';
export const CREATE_DATATYPE = 'CREATE_DATATYPE';
export const DELETE_DATATYPE = 'DELETE_DATATYPE';

const initialState = iMap({
  datatypes: iList()
});

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATATYPES:
      return state.merge({
        datatypes: fromJS(action.payload)
      });
    case UPDATE_DATATYPE:
      return state.merge({
        datatype: fromJS(action.payload)
      });
    case CREATE_DATATYPE:
      return state.merge({
        datatype: fromJS(action.payload)
      });
    case DELETE_DATATYPE:
      return state.merge({
        datatype: fromJS(action.payload)
      });
    default:
      return state;
  }
}
// get all users
//
export function getDatatypes() {
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
    } else {
      dispatch({
        type: GET_USERS,
        payload: data.getAllUsers
      });
    }
  };
}
// create a User
//
// export function createDatatype(user) {
//   const userMutation =
//   `
//   (
//     name:"${user.name}",
//     active:${user.active},
//     usertype:${user.usertype},
//     email:"${user.email}",
//     password:"${user.password}"
//   )
//   `;
//   const userSchema =
//   `
//     {
//       authToken
//     }
//   `;
//   return async(dispatch, getState) => {
//     const query = `
//         mutation {
//           createDatatype
//           ${userMutation}
//           ${userSchema}
//         }`;
//     const {error, data} = await fetchGraphQL({query});
//     if (error) {
//       console.error(error);
//     } else {
//       await dispatch({
//         type: CREATE_USER,
//         payload: data.createDatatype
//       });
//       await dispatch(getDatatypes());
//     }
//   };
// };
// update a user
//
// export function updateUser(user) {
//   const userMutation =
//   `
//   (
//     id:${user.id},
//     name:"${user.name}",
//     active:${user.active},
//     usertype:${user.usertype},
//     email:"${user.email}"
//   )
//   `;
//   const userSchema =
//   `
//     {
//       email,
//       id,
//       name,
//       active,
//       permissions,
//       usertype
//     }
//   `;
//   return async(dispatch, getState) => {
//     const query = `
//         mutation {
//           updateUser
//           ${userMutation}
//           ${userSchema}
//         }`;
//     const {error, data} = await fetchGraphQL({query});
//     if (error) {
//       console.error(error);
//     } else {
//       await dispatch({
//         type: UPDATE_USER,
//         payload: data.updateUser
//       });
//       await dispatch(getUsers());
//     }
//   };
// };
// delete a Datatype
//
// export function deleteDatatype(id) {
//   const userMutation =
//   `(id:${id})`;
//   const userSchema =
//   `{id}`;
//   return async(dispatch, getState) => {
//     const query = `
//         mutation {deleteDatatype${userMutation}${userSchema}}`;
//     const {error, data} = await fetchGraphQL({query});
//     if (error) {
//       console.error(error);
//     } else {
//       await dispatch({
//         type: DELETE_USER,
//         payload: data.deleteDatatype
//       });
//       await dispatch(getDatatypes());
//     }
//   };
// };
