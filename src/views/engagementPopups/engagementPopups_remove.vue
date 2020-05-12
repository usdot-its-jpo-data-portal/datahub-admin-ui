<template>
  <div class="cdh_row cdh_row_justify-center">
    <div class="cdh_column">
      <div class="cdh_row cdh_row_justify-center">
        <div class="cdh_column cdh_column_max-width-tablet">
          <h2>Remove Engagement Popup</h2>
          <div v-if="processingError || error" :class="processingError || error ? 'cdh_message-alert':''">
            <span id="id-engagementPopup-error-message">{{processingMessage + message}}</span>
          </div>
          <div v-if="processing" :class="processing ? 'cdh_message-action':''">
            <span id="id-engagementPopup-processing-message">{{message}}</span>
          </div>
          <hr v-if="processing || error">
          <div class="cdh_message">
            <p>The following Engagement Popup is going to be removed.</p>
            <p>Type the word "Delete" in the next input box and press the "Remove" button to confirm.</p>
          </div>
          <div :class="invalidConfirmation ? 'cdh_row cdh_input cdh_input-alert' : 'cdh_row cdh_input'">
            <input id="id-engagementPopup-input-confirmation" type="text" v-model="confirmation" placeholder="Confirmation...">
            <button id="id-engagementPopup-button-remove" v-on:click="removeClicked">Remove</button>
            <button id="id-engagementpopup-button-cancel" v-on:click="cancelClicked">Cancel</button>
          </div>
        </div>
      </div>
      <div class="cdh_row cdh_row_justify-center">
         <DHEngagementPopup v-if="selectedEngagementPopup" :data="selectedEngagementPopup" :hideControls="true" />
      </div>
    </div>
  </div>
</template>
<script>
import DHEngagementPopup from '@/components/dh-engagementpopup.vue';
export default {
  name: 'EngagementPopupRemove',
  data: function() {
    return {
      message: '',
      error: false,
      confirmation: '',
      invalidConfirmation: false
    }
  },
  components: {
    DHEngagementPopup
  },
  computed: {
    selectedEngagementPopup: {
      get: function() { return this.$store.state.selectedEngagementPopup; }
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
        if (this.processingId === 'RemoveEngagementPopup') {
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
          data: this.selectedEngagementPopup,
          id: 'RemoveEngagementPopup'
        };

        this.$store.dispatch('removeEngagementPopup', transacData);
      }
    },
    cancelClicked: function() {
      this.$router.push({path: '/engagementpopups'});
    },
    closeView: function() {
      if (!this.$store.state.processing_error) {
        this.processing = true;
        this.message = 'Processing...';
        setTimeout(()=>{
          this.message ='Done!';
          this.$router.push({path: '/engagementpopups'});
        }, 500);
      }
    }
  }
}
</script>
