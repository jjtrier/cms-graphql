import {fromJS, Map as iMap, List as iList} from 'immutable';
import {fetchGraphQL} from '../../../utils/fetching';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
// export const CREATE_FIELD = 'CREATE_FIELD';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const GET_DATATYPES = 'GET_DATATYPES';

const initialState = iMap({
  categories: iList(),
  category: iMap(),
  datatypes: iList()
});

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return state.merge({
        categories: fromJS(action.payload)
      });
    case GET_DATATYPES:
      return state.merge({
        datatypes: fromJS(action.payload)
      });
    case UPDATE_CATEGORY:
    // case UPDATE_FIELD:
    // case CREATE_FIELD:
    //   return state.merge({
    //     field: fromJS(action.payload)
    //   });
    case DELETE_CATEGORY:
    default:
      return state;
  }
}
// get all categories
//
export function getAllCategories() {
  const categorySchema = `{id,name,visible,datatype{id,name,description,fields{id,name,description,dataJSON}},entries{id,title,data}}`;
  const datatypesRequest = `getAllDatatypes{id,name,description,visible,fields{id,name,description}}`
  return async(dispatch, getState) => {
    const query = `
        query {
          getAllCategories
          ${categorySchema}
        ${datatypesRequest}} `;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      dispatch({
        type: GET_CATEGORIES,
        payload: data.getAllCategories
      });
      dispatch({
        type: GET_DATATYPES,
        payload: data.getAllDatatypes
      })
    }
  };
}
// delete a category
export function deleteCategory(id) {
  const categoryMutation =
  `(id:${id})`;
  const categorySchema =
  `{id}`;
  return async(dispatch, getState) => {
    const query = `
        mutation {deleteCategory${categoryMutation}${categorySchema}}`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      await dispatch({
        type: DELETE_CATEGORY,
        payload: data.deleteCategory
      });
      await dispatch(getAllCategories());
    }
  };
}
// update a category
export function updateCategory(variables) {
  const categoryMutation =
  `(
    id: $id,
    name: $name,
    visible: $visible,
    datatype: $datatype
  )`;
  const categorySchema = `{id,name,visible,datatype{id,name,description}}`;
  return async(dispatch, getState) => {
    const query = `mutation updateCategory($id: Int!, $name: String, $datatype: Int, $visible: Boolean){
          updateCategory
          ${categoryMutation}
          ${categorySchema}
        }`;
    const {error, data} = await fetchGraphQL({query, variables});
    if (error) {
      console.error(error);
    } else {
      await dispatch({
        type: UPDATE_CATEGORY,
        payload: data.updateCategory
      });
      await dispatch(getAllCategories());
    }
  };
}
// get all datatypes
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
