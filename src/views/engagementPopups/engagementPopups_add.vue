<template>
  <div class="cdh_row cdh_row_justify-center">
    <div class="cdh_column cdh_column_width-100">
      <div class="cdh_row cdh_row_justify-center">
        <div class="cdh_column cdh_column_max-width-tablet-lg">
          <h2>New Engagement PopUp</h2>
          <div v-if="processingError || error" :class="processingError || error ? 'cdh_message-alert':''">
            <span id="id-engagementPopup-error-message">{{processingMessage + message}}</span>
          </div>
          <div v-if="processing" :class="processing ? 'cdh_message-action':''">
            <span id="id-engagementPopup-processing-message">{{message}}</span>
          </div>
          <hr v-if="processing || error">
          <div class="cdh_message">
            <p>Type the word "Add" in the next input box and press the "Add" button to confirm.</p>
          </div>
          <div :class="invalidConfirmation ? 'cdh_row cdh_input cdh_input-alert' : 'cdh_row cdh_input'">
            <input id="id-engagementPopup-input-confirmation" type="text" v-model="confirmation" placeholder="Confirmation...">
            <button id="id-engagementPopup-button-add" v-on:click="addClicked">Add</button>
            <button id="id-engagementPopup-button-cancel" v-on:click="cancelClicked">Cancel</button>
          </div>
          <hr>
          <div class="cdh_row">
            <div :class="invalidName ? 'cdh_input cdh_input-alert' : 'cdh_input'">
              <label id="id-input-name-label" for="id-input-name">Name</label>
              <input type="text" v-model="newEngagementPopup.name" id="id-input-name" placeholder="Name...">
            </div>
          </div>
          <div class="cdh_row">
            <div class="cdh_column cdh_input">
              <label id="id-input-description-label" for="id-input-description">Description</label>
              <textarea v-model="newEngagementPopup.description" id="id-input-description" placeholder="Description..."></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="cdh_row cdh_row_justify-center">
        <div class="cdh_column cdh_column_width-90">
          <div :class="invalidContent ? 'cdh_input engpo__html-editor cdh_input-alert' : 'cdh_input engpo__html-editor'">
            <label id="id-engagementPopup-content-label" for="id-engagementPopup-content">Source code</label>
            <textarea id="id-engagementPopup-content" v-model="newEngagementPopup.content"></textarea>
          </div>
          <div class="cdh_row cdh_row_justify-end cdh_row_align-center engpo__controls-color">
            <label id="id-controls-color-label" for="id-controls-color">Controls font color:</label>
            <span :style="'background-color:'+newEngagementPopup.controlsColor">W</span>
            <select id="id-controls-color" v-model="newEngagementPopup.controlsColor">
              <option v-for="(item, index) in getColors()" :key="index" :value="item.value">{{item.color}}</option>
            </select>
            <label id="id-controls-shadow-label" for="id-controls-shadow">Controls font shadow:</label>
            <span :style="'background-color:'+newEngagementPopup.controlsShadow">W</span>
            <select id="id-controls-shadow" v-model="newEngagementPopup.controlsShadow">
              <option v-for="(item, index) in getColors()" :key="index" :value="item.value">{{item.color}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="cdh_row cdh_row_justify-center">
        <div class="cdh_column cdh_column_width-100">
          <div class="engpo__html-preview-wrapper">
            <label id="id-engagementPopup-preview-label" for="id-engagementPopup-preview">Preview</label>
            <div class="engpo__preview-close">
              <span id="id-engagementPopup-controls-close" :class="getColorClass+' '+getShadowClass">x</span>
            </div>
            <div class="engpo__html-preview" v-html="newEngagementPopup.content"></div>
            <div class="engpo__preview-noshow">
              <input id="id-engagementPopup-controls-noshow" type="checkbox" name="">
              <span id="id-engagementPopup-controls-noshow-text" :class="getColorClass+' '+getShadowClass">Click here if you would like to stop seeing this message</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DHMixin from '@/mixins/dh-mixin.js';
export default {
  name: 'EngagementPopupAdd',
  mixins: [DHMixin],
  data: function() {
    return {
      message: '',
      error: false,
      confirmation: '',
      invalidConfirmation: false,
      invalidName: false,
      invalidContent: false,
      newEngagementPopup: {
        id: null,
        name: '',
        isActive: false,
        description: '',
        lastModified: null,
        content: '',
        controlsColor: 'black',
        controlsShadow: 'white'
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
    },
    getColorClass: {
      get: function() {
        let val = (!this.newEngagementPopup || !this.newEngagementPopup.controlsColor) ? 'black' : this.newEngagementPopup.controlsColor;
        return this.getEngPopColorClass(val);
      }
    },
    getShadowClass: {
      get: function() {
        let val = (!this.newEngagementPopup || !this.newEngagementPopup.controlsShadow) ? 'white' : this.newEngagementPopup.controlsShadow;
        return this.getEngPopShadowClass(val);
      }
    }
  },
  watch: {
    processing: function(newValue, oldValue) {
      if (oldValue && !newValue) {
        if (this.processingId === 'AddEngagementPopup') {
          this.closeView();
        }
      }
    }
  },
  methods: {
    cancelClicked: function() {
      this.$router.push({path:'/engagementpopups'});
    },
    addClicked: function() {
      this.invalidConfirmation = this.confirmation != 'Add';
      this.invalidName = !this.newEngagementPopup.name || this.newEngagementPopup.name ==='';
      this.invalidContent = !this.newEngagementPopup.content || this.newEngagementPopup.content === '';

      this.error = this.invalidName || this.invalidContent;
      if (this.error) {
        this.message = 'Invalid field value.'
      } else if (!this.invalidConfirmation) {
        let transacData = {
          data: this.newEngagementPopup,
          id: 'AddEngagementPopup'
        };
        this.$store.dispatch('addEngagementPopup', transacData);
      }
    },
    closeView: function() {
      if (!this.$store.state.processing_error) {
        this.processing = true;
        this.message = 'Processing...';
        setTimeout(() => {
          this.message ='Done!';
          this.$router.push({path: '/engagementpopups'});
        }, 500);
      }
    }
  }
}
</script>
