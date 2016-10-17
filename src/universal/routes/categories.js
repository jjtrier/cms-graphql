import LandingContainer from 'universal/modules/landing/containers/Landing/LandingContainer';
import CategoriesContainer from 'universal/modules/categories/containers/categories/CategoriesContainer';
import makeReducer from 'universal/redux/makeReducer';
import {resolvePromiseMap} from 'universal/utils/promises';

export default function (store) {
  return {
    path: 'categories',
    component: LandingContainer,
    getIndexRoute: async (location, cb) => {
      const promiseMap = setImports();
      const importMap = await resolvePromiseMap(promiseMap);
      const {optimistic, ...asyncReducers} = getImports(importMap);
      const component = CategoriesContainer;
      const newReducer = makeReducer(asyncReducers, optimistic);
      store.replaceReducer(newReducer);
      cb(null, {component});
    }
  };
}

function setImports() {
  return new Map([
    ['optimistic', System.import('redux-optimistic-ui')],
    ['categories', System.import('universal/modules/categories/ducks/categoriesDucks')]
  ]);
}

function getImports(importMap) {
  return {
    optimistic: importMap.get('optimistic').optimistic,
    categories: importMap.get('categories').reducer
  };
}
