import {fromJS, Map as iMap, List as iList} from 'immutable';
import {fetchGraphQL} from '../../../utils/fetching';

export const GET_FIELDS = 'GET_FIELDS';
export const UPDATE_FIELD = 'UPDATE_FIELD';
export const CREATE_FIELD = 'CREATE_FIELD';
export const DELETE_FIELD = 'DELETE_FIELD';

const initialState = iMap({
  fields: iList(),
  field: iMap()
});

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FIELDS:
      return state.merge({
        fields: fromJS(action.payload)
      });
    case UPDATE_FIELD:
    case CREATE_FIELD:
      return state.merge({
        field: fromJS(action.payload)
      });
    case DELETE_FIELD:
    default:
      return state;
  }
}
// get all fields
//
export function getFields() {
  const fieldSchema = `{id,name,description,datatypes{name,id,description},dataJSON,required}`;
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
//   const fieldSchema =
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
//           ${fieldSchema}
//         }`;
//     const {error, data} = await fetchGraphQL({query});
//     if (error) {
//       console.error(error);
//     } else {
//       await dispatch({
//         type: CREATE_USER,
//         payload: data.createDatatype
//       });
//       await dispatch(getFields());
//     }
//   };
// };
// update a field
export function updateField(field, variables) {
  const fieldMutation =
  `
  (
    id: $id,
    name: $name,
    description: $description,
    datatypes: $datatypes,
    required: $required,
    dataJSON: $dataJSON
  )
  `;
  const fieldSchema = `{id,name,description,required,datatypes{name,id,description},dataJSON}`;
  return async(dispatch, getState) => {
    const query = `mutation updateField($id: Int!, $name: String!, $description: String, $datatypes: [Int], $required: Boolean!, $dataJSON: JSON){
          updateField
          ${fieldMutation}
          ${fieldSchema}
        }`;
    const {error, data} = await fetchGraphQL({query, variables});
    if (error) {
      console.error(error);
    } else {
      await dispatch({
        type: UPDATE_FIELD,
        payload: data.updateField
      });
      await dispatch(getFields());
    }
  };
}

// delete a Field
export function deleteField(id) {
  const fieldMutation =
  `(id:${id})`;
  const fieldSchema =
  `{id}`;
  return async(dispatch, getState) => {
    const query = `
        mutation {deleteField${fieldMutation}${fieldSchema}}`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      await dispatch({
        type: DELETE_FIELD,
        payload: data.deleteField
      });
      await dispatch(getFields());
    }
  };
};
