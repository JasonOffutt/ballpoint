import Editor from './components/Editor';

module.exports = {
  install: (Vue) => {
    Vue.component('balloint-editor', Editor);
  },
};
