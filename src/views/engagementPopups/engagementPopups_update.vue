<template>
  <div class="cdh_row cdh_row_justify-center">
    <div v-if="selectedEngagementPopup" class="cdh_column cdh_column_width-100">
      <div class="cdh_row cdh_row_justify-center">
        <div class="cdh_column cdh_column_max-width-tablet-lg">
          <h2>Update Engagement PopUp</h2>
          <div v-if="processingError || error" :class="processingError || error ? 'cdh_message-alert':''">
            <span id="id-engagementPopup-error-message">{{processingMessage + message}}</span>
          </div>
          <div v-if="processing" :class="processing ? 'cdh_message-action':''">
            <span id="id-engagementPopup-processing-message">{{message}}</span>
          </div>
          <hr v-if="processing || error">
          <div class="cdh_message">
            <p>Type the word "Update" in the next input box and press the "Update" button to confirm.</p>
          </div>
          <div :class="invalidConfirmation ? 'cdh_row cdh_input cdh_input-alert' : 'cdh_row cdh_input'">
            <input id="id-engagementPopup-input-confirmation" type="text" v-model="confirmation" placeholder="Confirmation...">
            <button id="id-engagementPopup-button-update" v-on:click="updateClicked">Update</button>
            <button id="id-engagementpopup-button-cancel" v-on:click="cancelClicked">Cancel</button>
          </div>
          <hr>
          <div class="cdh_row cdh_row_align-center cdh_input-checkbox">
            <input id="id-engagementPopup-isActive" type="checkbox" v-model="selectedEngagementPopup.isActive" ref="refIsActive">
            <span id="id-engagementPopup-isActive-label">Is Active</span>
            <DHField id="id-engagementPopup-id" label="ID: " :value="selectedEngagementPopup ? selectedEngagementPopup.id : ''" size="small" weight="normal" color="gray"/>
          </div>
          <div class="cdh_row">
            <div :class="invalidName ? 'cdh_input cdh_input-alert' : 'cdh_input'">
              <label id="id-engagementPopup-name-label" for="id-engagementPopup-name">Name</label>
              <input type="text" v-model="selectedEngagementPopup.name" id="id-engagementPopup-name" placeholder="Name..." ref="refName">
            </div>
          </div>
          <div class="cdh_row">
            <div class="cdh_column cdh_input">
              <label id="id-engagementPopup-description-label" for="id-engagementPopup-description">Description</label>
              <textarea v-model="selectedEngagementPopup.description" id="id-engagementPopup-description" placeholder="Description..." ref="refDescription"></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="cdh_row cdh_row_justify-center">
        <div class="cdh_column cdh_column_width-90">
          <div :class="invalidContent ? 'cdh_input engpo__html-editor cdh_input-alert' : 'cdh_input engpo__html-editor'">
            <label id="id-engagementPopup-content-label" for="id-engagementPopup-content">Source code</label>
            <textarea  id="id-engagementPopup-content" v-model="selectedEngagementPopup.content" ref="refContent"></textarea>
          </div>
          <div class="cdh_row cdh_row_justify-end cdh_row_align-center engpo__controls-color">
            <label id="id-controls-color-label" for="id-controls-color">Controls font color:</label>
            <span id="id-controls-color-current" :style="'background-color:'+selectedEngagementPopup.controlsColor">W</span>
            <select id="id-controls-color" v-model="selectedEngagementPopup.controlsColor">
              <option v-for="(item, index) in getColors()" :key="index" :value="item.value">{{item.color}}</option>
            </select>
            <label id="id-controls-shadow-label" for="id-controls-shadow">Controls font shadow:</label>
            <span id="id-controls-shadow-current" :style="'background-color:'+selectedEngagementPopup.controlsShadow">W</span>
            <select id="id-controls-shadow" v-model="selectedEngagementPopup.controlsShadow">
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
            <div id="id-engagementPopup-preview" class="engpo__html-preview" v-html="selectedEngagementPopup.content"></div>
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
import DHField from '@/components/dh-field';
export default {
  name: 'EngagementPopupAdd',
  components: {
    DHField
  },
  mixins: [DHMixin],
  data: function() {
    return {
      message: '',
      error: false,
      confirmation: '',
      invalidConfirmation: false,
      invalidName: false,
      invalidContent: false,
      selectedEngagementPopup: null
    }
  },
  created: function() {
    if (!this.$store.state.selectedEngagementPopup) {
      this.$router.push({path: '/engagementpopups'})
    }

    this.selectedEngagementPopup = this.$store.state.selectedEngagementPopup;
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
        let val = (!this.selectedEngagementPopup || !this.selectedEngagementPopup.controlsColor) ? 'black' : this.selectedEngagementPopup.controlsColor;
        return this.getEngPopColorClass(val);
      }
    },
    getShadowClass: {
      get: function() {
        let val = (!this.selectedEngagementPopup || !this.selectedEngagementPopup.controlsShadow) ? 'white' : this.selectedEngagementPopup.controlsShadow;
        return this.getEngPopShadowClass(val);
      }
    }
  },
  watch: {
    processing: function(newValue, oldValue) {
      if (oldValue && !newValue) {
        if (this.processingId === 'UpdateEngagementPopup') {
          this.closeView();
        }
      }
    }
  },
  methods: {
    cancelClicked: function() {
      this.$router.push({path:'/engagementpopups'});
    },
    updateClicked: function() {
      this.invalidConfirmation = this.confirmation != 'Update';
      this.invalidName = !this.selectedEngagementPopup.name || this.selectedEngagementPopup.name ==='';
      this.invalidContent = !this.selectedEngagementPopup.content || this.selectedEngagementPopup.content === '';

      this.error = this.invalidName || this.invalidContent;
      if (this.error) {
        this.message = 'Invalid field value.'
      } else if (!this.invalidConfirmation) {
        let transacData = {
          data: this.selectedEngagementPopup,
          id: 'UpdateEngagementPopup'
        };
        this.$store.dispatch('updateEngagementPopup', transacData);
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
