import {GraphQLObjectType} from 'graphql';
// import lane from './models/Lanes/laneSubscription';
// import note from './models/Notes/noteSubscription';

// const rootFields = Object.assign(lane, note);
const rootFields = {};

export default new GraphQLObjectType({
  name: 'RootSubscription',
  fields: () => rootFields
});
