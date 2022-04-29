import * as allIcons from "ionicons/icons";

const registerIcons = {
  data() {
    return {
      i: allIcons,
    };
  },
  methods: {
    getIcon(name) {
      return this.i[name];
    },
  },
}

export default registerIcons