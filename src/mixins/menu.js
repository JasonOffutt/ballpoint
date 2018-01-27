export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      hovering: false,
      showMenu: false,
      tabIndex: -1,
    };
  },

  methods: {
    handleBlur() {
      if (!this.disabled && !this.hovering) {
        this.showMenu = false;
      }
    },

    handleButtonClick() {
      if (!this.disabled) {
        this.showMenu = !this.showMenu;
      }
    },

    handleHover(value) {
      this.hovering = value;
    },
  },
};
