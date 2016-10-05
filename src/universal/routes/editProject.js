export default {
  path: 'editproject',
  getComponent: async (location, cb) => {
    const component = await System.import('universal/modules/projects/components/editProject/editProject');
    cb(null, component);
  }
};
