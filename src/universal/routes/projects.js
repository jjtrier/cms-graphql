import LandingContainer from 'universal/modules/landing/containers/Landing/LandingContainer';
import ProjectsContainer from 'universal/modules/projects/containers/projects/ProjectsContainer';
import makeReducer from 'universal/redux/makeReducer';
import {resolvePromiseMap} from 'universal/utils/promises';

export default function (store) {
  return {
    path: 'projects',
    component: LandingContainer,
    getIndexRoute: async (location, cb) => {
      const promiseMap = setImports();
      const importMap = await resolvePromiseMap(promiseMap);
      const {optimistic, ...asyncReducers} = getImports(importMap);
      const component = ProjectsContainer;
      const newReducer = makeReducer(asyncReducers, optimistic);
      store.replaceReducer(newReducer);
      cb(null, {component});
    }
  };
}

function setImports() {
  return new Map([
    ['optimistic', System.import('redux-optimistic-ui')],
    ['projects', System.import('universal/modules/projects/ducks/projects')]
  ]);
}

function getImports(importMap) {
  return {
    optimistic: importMap.get('optimistic').optimistic,
    projects: importMap.get('projects').reducer
  };
}
