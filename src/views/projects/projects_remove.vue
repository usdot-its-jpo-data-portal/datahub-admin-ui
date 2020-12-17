<template>
  <div class="cdh_row cdh_row_justify-center">
    <div class="cdh_column cdh_column_max-width-tablet">
      <h2>Remove Project</h2>
      <div v-if="processingError || error" :class="processingError || error ? 'cdh_message-alert':''">
        <span id="id-project-error-message">{{processingMessage + message}}</span>
      </div>
      <div v-if="processing" :class="processing ? 'cdh_message-action':''">
        <span id="id-project-processing-message">{{message}}</span>
      </div>
      <hr v-if="processing || error">
      <div class="cdh_message">
        <p>The following Project is going to be removed.</p>
        <p>Type the word "Delete" in the next input box and press the "Remove" button to confirm.</p>
      </div>
      <div :class="invalidConfirmation ? 'cdh_row cdh_input cdh_input-alert' : 'cdh_row cdh_input'">
        <input id="id-project-input-confirmation" type="text" v-model="confirmation" placeholder="Confirmation...">
        <button id="id-project-button-remove" v-on:click="removeClicked">Remove</button>
        <button id="id-project-button-cancel" v-on:click="cancelClicked">Cancel</button>
      </div>
      <div class="">
         <DHProject v-if="selectedProject" :data="selectedProject" :hideControls="true" />
      </div>
    </div>
  </div>
</template>
<script>
import DHProject from '@/components/dh-project.vue'
export default {
  name: 'ProjectsRemove',
  data: function() {
    return {
      message: '',
      error: false,
      confirmation: '',
      invalidConfirmation: false
    }
  },
  components: {
    DHProject
  },
  computed: {
    selectedProject: {
      get: function() { return this.$store.state.selectedProject; }
    },
    processing: {
      get: function() {return this.$store.state.is_processing; },
      set: function(val) { this.$store.commit('setIsProcessing', val)}
    },
    processingMessage: {
      get: function() {return this.$store.state.processing_message;},
      set: function(val) {this.$store.state.processing_message = val;}
    },
    processingError: {
      get: function() {return this.$store.state.processing_error; }
    },
    processingId: {
      get: function() {return this.$store.state.processing_id; }
    }
  },
  watch: {
    processing: function(newValue, oldValue) {
      if (oldValue && !newValue) {
        if (this.processingId === 'RemoveProject') {
          this.closeView();
        }
      }
    }
  },
  methods: {
    removeClicked: function() {
      this.invalidConfirmation = this.confirmation != 'Delete';
      if(!this.invalidConfirmation) {

        let transacData = {
          data: this.selectedProject,
          id: 'RemoveProject'
        };

        this.$store.dispatch('removeProject', transacData);
      }
    },
    cancelClicked: function() {
      this.$router.push({path: '/projects'});
    },
    closeView: function() {
      if (!this.$store.state.processing_error) {
        this.processing = true;
        this.message = 'Processing...';
        setTimeout(()=>{
          this.message ='Done!';
          this.$router.push({path: '/projects'});
        }, 500);
      }
    }
  }
}
</script>
