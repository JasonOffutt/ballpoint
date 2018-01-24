export default {
  allMergeFields({ mergeFields }) {
    return {
      ...mergeFields,
    };
  },

  categories({ mergeFields }) {
    return mergeFields.map(item => item.category);
  },
};
