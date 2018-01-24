import Vue from 'vue';

export default {
  setMergeFields(state, mergeFields) {
    Vue.set(state, 'mergeFields', {
      ...state.mergeFields,
      ...mergeFields,
    });
  },
};
