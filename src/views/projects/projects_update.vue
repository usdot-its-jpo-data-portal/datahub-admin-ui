<template>
  <div class="cdh_row cdh_row_justify-center">
    <div class="cdh_column cdh_column_max-width-tablet">
      <h2>Update Project</h2>
      <div v-if="processingError || error" :class="processingError || error ? 'cdh_message-alert':''">
        <span>{{processingMessage + message}}</span>
      </div>
      <div v-if="processing" :class="processing ? 'cdh_message-action':''">
        <span>{{message}}</span>
      </div>
      <hr v-if="processing || error">
      <div class="cdh_message">
        <p>Type the word "Update" in the next input box and press the "Update" button to confirm.</p>
      </div>
      <div :class="invalidConfirmation ? 'cdh_row cdh_input cdh_input-alert' : 'cdh_row cdh_input'">
        <input type="text" v-model="confirmation" placeholder="Confirmation...">
        <button v-on:click="updateClicked">Update</button>
        <button v-on:click="cancelClicked">Cancel</button>
      </div>
      <hr>
      <div class="cdh_row">
        <DHField label="ID: " :value="selectedProject ? selectedProject.id : ''" size="small" weight="normal" color="gray"/>
      </div>
      <div class="cdh_row cdh_row_align-center cdh_input">
        <input type="checkbox" v-model="selectedProject.isEnabled">
        <label>Enabled</label>
      </div>
      <div class="cdh_row">
        <div class="cdh_column cdh_input" :class="invalidName ? 'cdh_input-alert' : ''">
          <label for="id-project-name">Name</label>
          <input type="text" v-model="selectedProject.name" id="id-project-name" placeholder="Project name...">
        </div>
      </div>
      <div class="cdh_row">
        <div class="cdh_column cdh_input">
          <label for="id-project-description">Description</label>
          <textarea v-model="selectedProject.description"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DHField from '@/components/dh-field';
export default {
  name: "ProjectsUpdate",
  components: {
    DHField
  },
  data: function() {
    return {
      message: '',
      error: false,
      selectedProject : null,
      confirmation: '',
      invalidConfirmation: false,
      invalidName: false
    }
  },
  created: function() {
    if (!this.$store.state.selectedProject) {
      this.$router.push({path: '/projects'});
    }

    this.selectedProject = this.$store.state.selectedProject;
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
        if (this.processingId === 'UpdateProject') {
          this.closeView();
        }
      }
    }
  },
  methods: {
    cancelClicked: function() {
      this.$router.push({path:'/projects'});
    },
    updateClicked: function() {
      this.invalidConfirmation = this.confirmation != 'Update';
      this.invalidName = this.selectedProject.name == '';

      this.error = this.invalidName || this.invalidConfirmation;
      if (this.error) {
        this.message = 'Invalid field value.'
      } else if (!this.invalidConfirmation) {
        let transacData = {
          data: this.selectedProject,
          id: 'UpdateProject'
        };
        this.$store.dispatch('updateProject', transacData);
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
<style lang="scss" scoped>

</style>