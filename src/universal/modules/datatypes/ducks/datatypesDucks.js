import {fromJS, Map as iMap, List as iList} from 'immutable';
import {fetchGraphQL} from '../../../utils/fetching';

export const GET_DATATYPES = 'GET_DATATYPES';
export const UPDATE_DATATYPE = 'UPDATE_DATATYPE';
export const CREATE_DATATYPE = 'CREATE_DATATYPE';
export const DELETE_DATATYPE = 'DELETE_DATATYPE';
export const GET_FIELDS = 'GET_FIELDS';


const initialState = iMap({
  datatypes: iList(),
  fields: iList()
});

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATATYPES:
      return state.merge({
        datatypes: fromJS(action.payload)
      });
    case GET_FIELDS:
      return state.merge({
        fields: fromJS(action.payload)
      });
    case UPDATE_DATATYPE:
    case CREATE_DATATYPE:
      return state.merge({
        datatype: fromJS(action.payload)
      });
    case DELETE_DATATYPE:
    default:
      return state;
  }
}
// get all datatypes
//
export function getDatatypes() {
  const datatypeSchema =
  `{id,name,description,visible,fields{id,name,description}}`;
  return async(dispatch, getState) => {
    const query = `
        query {
          getAllDatatypes
          ${datatypeSchema}
        }`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      dispatch({
        type: GET_DATATYPES,
        payload: data.getAllDatatypes
      });
    }
  };
}
export function getFields() {
  const fieldSchema =
  `{id,name,description,datatypes{name,id,description}}`;
  return async(dispatch, getState) => {
    const query = `
        query {
          getAllFields
          ${fieldSchema}
        }`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      dispatch({
        type: GET_FIELDS,
        payload: data.getAllFields
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
//   const datatypeSchema =
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
//           ${datatypeSchema}
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
// update a datatype
export function updateDatatype(datatype, variables) {
  const datatypeMutation =
  `
  (
    id: $id,
    name: $name,
    description: $description,
    visible: $visible,
    fields: $fields
  )
  `;
  const datatypeSchema = `{id,name,description,visible,fields{id,name,description}}`;
  return async(dispatch, getState) => {
    const query = `
        mutation M($id: Int!, $name: String, $description: String, $visible: Boolean, $fields: [Int]){
          updateDatatype
          ${datatypeMutation}
          ${datatypeSchema}
        }`;
    const {error, data} = await fetchGraphQL({query, variables});
    if (error) {
      console.error(error);
    } else {
      await dispatch({
        type: UPDATE_DATATYPE,
        payload: data.updateDatatype
      });
      await dispatch(getDatatypes());
    }
  };
};

// delete a Datatype
export function deleteDatatype(id) {
  const dataTypeMutation =
  `(id:${id})`;
  const datatypeSchema =
  `{id}`;
  return async(dispatch, getState) => {
    const query = `
        mutation {deleteDatatype${dataTypeMutation}${datatypeSchema}}`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      await dispatch({
        type: DELETE_DATATYPE,
        payload: data.deleteDatatype
      });
      await dispatch(getDatatypes());
    }
  };
};
