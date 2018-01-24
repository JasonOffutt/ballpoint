import Vue from 'vue';
import Vuex from 'vuex';

import mergeFields from './mergeFields';

Vue.use(Vuex);

const modules = {
  mergeFields,
};

export default new Vuex.Store({
  modules,
});
