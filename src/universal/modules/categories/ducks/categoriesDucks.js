import {fromJS, Map as iMap, List as iList} from 'immutable';
import {fetchGraphQL} from '../../../utils/fetching';

export const GET_CATEGORIES = 'GET_CATEGORIES';
// export const UPDATE_FIELD = 'UPDATE_FIELD';
// export const CREATE_FIELD = 'CREATE_FIELD';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

const initialState = iMap({
  categories: iList(),
  category: iMap()
});

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return state.merge({
        categories: fromJS(action.payload)
      });
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
// get all fields
//
export function getAllCategories() {
  const categorySchema = `{id,name,visible,datatype{name,description,fields{id,name,description,dataJSON}},entries{id,title,data}}`;
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

// delete a Field
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
};
