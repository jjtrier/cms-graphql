import AppContainer from 'universal/containers/App/AppContainer';
 // ALL OF OR ROUTE FUNCTIONALITY GOES THROUGH HERE

export default store => {
  return {
    component: AppContainer,
    childRoutes: [
      require('./users')(store),
      require('./projects')(store),
      require('./fields')(store),
      require('./datatypes')(store),
      require('./categories')(store),
      require('./landing'),
      require('./accounts')(store),
      require('./graphql'),
      require('./notFound')
    ]
  };
};

// this is an example of how to use the get components feature
// http://github.com/reactjs/react-router/blob/master/docs
// more information here

// System.import is an es6 feature on loading modules. It's thenable

// export default {
//   path: 'graphql',
//   getComponent: async (location, cb) => {
//     const component = await System.import('universal/modules/admin/components/Graphql/Graphql');
//     cb(null, component);
//   }
// };
