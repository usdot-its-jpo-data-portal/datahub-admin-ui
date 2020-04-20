<template>
  <div class="cdh_row cdh_row_justify-center">
    <div class="cdh_column cdh_column_max-width-tablet">
      <h2>Add Data Type</h2>
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
        <input id="id-datatype-enabled" type="checkbox" v-model="newDataType.isEnabled">
        <label id="id-datatype-enabled-label" for="id-datatype-enabled">Enabled</label>
      </div>
      <div class="cdh_row">
        <div class="cdh_column cdh_input" :class="invalidName ? 'cdh_input-alert' : ''">
          <label id="id-datatype-name-label" for="id-datatype-name">Name</label>
          <input type="text" v-model="newDataType.name" id="id-datatype-name" placeholder="Data Type name...">
        </div>
      </div>
      <div class="cdh_row">
        <div class="cdh_column cdh_input">
          <label id="id-datatype-description-label" for="id-datatype-description">Description</label>
          <textarea id="id-datatype-description" v-model="newDataType.description"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DataTypesAdd",
  data: function() {
    return {
      message: '',
      error: false,
      selectedDataType : null,
      confirmation: '',
      invalidConfirmation: false,
      invalidName: false,
      newDataType: {
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
        if (this.processingId === 'AddDataType') {
          this.closeView();
        }
      }
    }
  },
  methods: {
    cancelClicked: function() {
      this.$router.push({path:'/datatypes'});
    },
    addClicked: function() {
      this.invalidConfirmation = this.confirmation != 'Add';
      this.invalidName = this.newDataType.name == '';

      this.error = this.invalidName || this.invalidConfirmation;
      if (this.error) {
        this.message = 'Invalid field value.'
      } else if (!this.invalidConfirmation) {
        let transacData = {
          data: this.newDataType,
          id: 'AddDataType'
        };
        this.$store.dispatch('addDataType', transacData);
      }
    },
    closeView: function() {
      if (!this.$store.state.processing_error) {
        this.processing = true;
        this.message = 'Processing...';
        this.$store.dispatch('getDataTypes');
        setTimeout(() => {
          this.message ='Done!';
          this.$router.push({path: '/datatypes'});
        }, 500);
      }
    }
  }
}
</script>
