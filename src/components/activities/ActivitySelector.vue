<template>
  <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">
            Select the activity to compare
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <app-activities></app-activities>
        </div>
        <div class="modal-footer">
          <div class="left-side">
            <button type="button" class="btn btn-default btn-link" data-dismiss="modal">Cancel</button>
          </div>
          <div class="divider"></div>
          <div class="right-side">
            <button type="button" class="btn btn-danger btn-link">Select</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Activities from './Activities';

  export default {
    components: {
      appActivities: Activities
    }
  }
</script>

<style scoped>
  h5 {
    margin-bottom: 0;
  }
  div.modal-dialog {
    padding-top: 12px;
    min-width: 50%;
  }
  div.modal-header {
    padding: 12px;
  }
  button.close {
    position: absolute;
    top: 0.4rem !important;
    right: 0.6rem !important;
  }
</style>