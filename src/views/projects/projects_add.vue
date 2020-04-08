<template>
  <div class="cdh_row cdh_row_justify-center">
    <div class="cdh_column cdh_column_max-width-tablet">
      <h2>Add Project</h2>
      <div v-if="processingError || error" :class="processingError || error ? 'cdh_message-alert':''">
        <span>{{processingMessage + message}}</span>
      </div>
      <div v-if="processing" :class="processing ? 'cdh_message-action':''">
        <span>{{message}}</span>
      </div>
      <hr v-if="processing || error">
      <div class="cdh_message">
        <p>Type the word "Add" in the next input box and press the "Add" button to confirm.</p>
      </div>
      <div :class="invalidConfirmation ? 'cdh_row cdh_input cdh_input-alert' : 'cdh_row cdh_input'">
        <input type="text" v-model="confirmation" placeholder="Confirmation...">
        <button v-on:click="addClicked">Add</button>
        <button v-on:click="cancelClicked">Cancel</button>
      </div>
      <hr>
      <div class="cdh_row cdh_row_align-center cdh_input">
        <input type="checkbox" v-model="newProject.isEnabled">
        <label>Enabled</label>
      </div>
      <div class="cdh_row">
        <div class="cdh_column cdh_input" :class="invalidName ? 'cdh_input-alert' : ''">
          <label for="id-project-name">Name</label>
          <input type="text" v-model="newProject.name" id="id-project-name" placeholder="Project name...">
        </div>
      </div>
      <div class="cdh_row">
        <div class="cdh_column cdh_input">
          <label for="id-project-description">Description</label>
          <textarea v-model="newProject.description"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProjectsAdd",
  data: function() {
    return {
      message: '',
      error: false,
      selectedProject : null,
      confirmation: '',
      invalidConfirmation: false,
      invalidName: false,
      newProject: {
        id: null,
        name: '',
        description: '',
        isEnabled: false
      }
    }
  },
  computed: {
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
        if (this.processingId === 'AddProject') {
          this.closeView();
        }
      }
    }
  },
  methods: {
    cancelClicked: function() {
      this.$router.push({path:'/projects'});
    },
    addClicked: function() {
      this.invalidConfirmation = this.confirmation != 'Add';
      this.invalidName = this.newProject.name == '';

      this.error = this.invalidName || this.invalidConfirmation;
      if (this.error) {
        this.message = 'Invalid field value.'
      } else if (!this.invalidConfirmation) {
        let transacData = {
          data: this.newProject,
          id: 'AddProject'
        };
        this.$store.dispatch('addProject', transacData);
      }
    },
    closeView: function() {
      if (!this.$store.state.processing_error) {
        this.processing = true;
        this.message = 'Processing...';
        this.$store.dispatch('getProjects');
        setTimeout(() => {
          this.message ='Done!';
          this.$router.push({path: '/projects'});
        }, 500);
      }
    }
  }
}
</script>
