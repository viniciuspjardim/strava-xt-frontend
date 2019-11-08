export const activitiesCache = {
  data() {
    // Main activity is always in the selected array at index 0
    return {
      main: null,
      selected: [],
      cache: new Map(),
      colors: [
        { color: '#f44', id: null },
        { color: '#44f', id: null },
        { color: '#4c4', id: null },
        { color: '#848', id: null },
        { color: '#CCC', id: null }
      ]
    }
  },
  methods: {
    selectionChange(s) {
      // Adding new selected elements
      s.forEach(activityId => {
        if(this.selected.indexOf(activityId) == -1) {
          this.selected.push(activityId);
          this.bindColor(activityId);
        }
      });
      // Removing new unselected elements
      this.selected.forEach((activityId, i) => {
        if(s.indexOf(activityId) == -1) {
          this.selected.splice(i, 1);
          this.freeColor(activityId);
        }
      });
      if(this.main) this.colors[0].id = this.main;
    },
    hasOnCache(activityId) {
      return this.cache.has(String(activityId));
    },
    getFromCache(activityId) {
      return this.cache.get(String(activityId));
    },
    addToCache(activity) {
      this.cache.set(String(activity.id), activity);
    },
    bindColor(activityId) {
      for(let i = 0; i < this.colors.length; i++) {
        if(!this.colors[i].id) {
          this.colors[i].id = activityId;
          return this.colors[i].color;
        }
      }
      return '#AAA';
    },
    freeColor(activityId) {
      for(let i = 0; i < this.colors.length; i++) {
        if(this.colors[i].id == activityId) {
          this.colors[i].id = null;
          return;
        }
      }
    },
    getColor(activityId) {
      for(let i = 0; i < this.colors.length; i++) {
        if(this.colors[i].id == activityId) {
          return this.colors[i].color;
        }
      }
      return '#AAA';
    }
  }
}