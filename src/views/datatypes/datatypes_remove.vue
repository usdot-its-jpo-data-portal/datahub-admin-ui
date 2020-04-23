<template>
  <div class="cdh_row cdh_row_justify-center">
    <div class="cdh_column cdh_column_max-width-tablet">
      <h2>Remove Data Type</h2>
      <div v-if="processingError || error" :class="processingError || error ? 'cdh_message-alert':''">
        <span id="id-datatype-error-message">{{processingMessage + message}}</span>
      </div>
      <div v-if="processing" :class="processing ? 'cdh_message-action':''">
        <span id="id-datatype-processing-message">{{message}}</span>
      </div>
      <hr v-if="processing || error">
      <div class="cdh_message">
        <p>The following Data Type is going to be removed.</p>
        <p>Type the word "Delete" in the next input box and press the "Remove" button to confirm.</p>
      </div>
      <div :class="invalidConfirmation ? 'cdh_row cdh_input cdh_input-alert' : 'cdh_row cdh_input'">
        <input type="text" v-model="confirmation" placeholder="Confirmation...">
        <button v-on:click="removeClicked">Remove</button>
        <button v-on:click="cancelClicked">Cancel</button>
      </div>
      <div class="">
         <DHDataType v-if="selectedDataType" :data="selectedDataType" :hideControls="true" />
      </div>
    </div>
  </div>
</template>
<script>
import DHDataType from '@/components/dh-dataType.vue'
export default {
  name: 'DataTypesRemove',
  data: function() {
    return {
      message: '',
      error: false,
      confirmation: '',
      invalidConfirmation: false
    }
  },
  components: {
    DHDataType
  },
  computed: {
    selectedDataType: {
      get: function() { return this.$store.state.selectedDataType; }
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
        if (this.processingId === 'RemoveDataType') {
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
          data: this.selectedDataType,
          id: 'RemoveDataType'
        };

        this.$store.dispatch('removeDataType', transacData);
      }
    },
    cancelClicked: function() {
      this.$router.push({path: '/datatypes'});
    },
    closeView: function() {
      if (!this.$store.state.processing_error) {
        this.processing = true;
        this.message = 'Processing...';
        setTimeout(()=>{
          this.message ='Done!';
          this.$router.push({path: '/datatypes'});
        }, 500);
      }
    }
  }
}
</script>