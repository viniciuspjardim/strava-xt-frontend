export const activitiesCache = {
  data() {
    // Main activity is always in the selected array at index 0
    return {
      main: null,
      selected: [],
      cache: {}
    }
  },
  methods: {
    selectionChange(s) {
      // Adding new selected elements
      s.forEach(element => {
        if(this.selected.indexOf(element) == -1) {
          this.selected.push(element);
        }
      });
      // Removing new unselected elements
      this.selected.forEach((element, i) => {
        if(s.indexOf(element) == -1) {
          this.selected.splice(i, 1);
        }
      });
    }
  }
}