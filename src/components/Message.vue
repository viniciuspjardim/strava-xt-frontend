<template>
  <div v-if="message.visible" :class="msgClass">
    {{ message.text }}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters(['message']),
      msgClass() {
        if(this.message.type == 'warning') return 'alert alert-warning';
        else if(this.message.type == 'error') return 'alert alert-dange';
        return 'alert alert-info';
      }
    }
  }
</script>
