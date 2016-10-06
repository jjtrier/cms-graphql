import LandingContainer from 'universal/modules/landing/containers/Landing/LandingContainer';
import EditProjectContainer from 'universal/modules/projects/containers/editProject/EditProjectContainer';
import makeReducer from 'universal/redux/makeReducer';
import {resolvePromiseMap} from 'universal/utils/promises';

export default function (store) {
  return {
    path: 'editProject',
    component: LandingContainer,
    getIndexRoute: async (location, cb) => {
      const promiseMap = setImports();
      const importMap = await resolvePromiseMap(promiseMap);
      const {optimistic, ...asyncReducers} = getImports(importMap);
      const component = EditProjectContainer;
      const newReducer = makeReducer(asyncReducers, optimistic);
      store.replaceReducer(newReducer);
      cb(null, {component});
    }
  };
}

function setImports() {
  return new Map([
    ['optimistic', System.import('redux-optimistic-ui')],
    ['project', System.import('universal/modules/projects/ducks/editProject')]
  ]);
}

function getImports(importMap) {
  return {
    optimistic: importMap.get('optimistic').optimistic,
    project: importMap.get('project').reducer
  };
}
