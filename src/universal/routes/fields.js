import LandingContainer from 'universal/modules/landing/containers/Landing/LandingContainer';
import FieldsContainer from 'universal/modules/fields/containers/fields/FieldsContainer';
import makeReducer from 'universal/redux/makeReducer';
import {resolvePromiseMap} from 'universal/utils/promises';

export default function (store) {
  return {
    path: 'fields',
    component: LandingContainer,
    getIndexRoute: async (location, cb) => {
      const promiseMap = setImports();
      const importMap = await resolvePromiseMap(promiseMap);
      const {optimistic, ...asyncReducers} = getImports(importMap);
      const component = FieldsContainer;
      const newReducer = makeReducer(asyncReducers, optimistic);
      store.replaceReducer(newReducer);
      cb(null, {component});
    }
  };
}

function setImports() {
  return new Map([
    ['optimistic', System.import('redux-optimistic-ui')],
    ['fields', System.import('universal/modules/fields/ducks/fieldsDucks')]
  ]);
}

function getImports(importMap) {
  return {
    optimistic: importMap.get('optimistic').optimistic,
    fields: importMap.get('fields').reducer
  };
}
