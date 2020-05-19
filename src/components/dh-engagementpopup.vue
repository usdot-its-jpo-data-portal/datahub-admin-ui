<template>
  <div class="dh-engagementpopup__wrapper">
    <div class="dh-engagementpopup_row dh-engagementpopup_space-between">
      <div class="dh-engagementpopup_row">
        <DHField id="id-data-name" label="Name:" :value="data ? data.name : '[None]'" size="Large" weight="bold" color="green" shadow="true" />
        <DHField id="id-data-isActive" label="Is Active:" :value="data ? data.isActive : '[None]'" size="small" :weight="data.isActive==true ? 'bold' : 'normal'" :color="data.isActive==true ? 'navy' : 'black'" shadow="false" />
      </div>
      <div v-if="!hideControls" class="dh-engagementpopup_row">
        <a id="id-cb-update" v-on:click="actionCallback('update', data.id)">
          <PlaylistEdit title="Update EngagementPopup" :size="18"/>
        </a>
        <a id="id-cb-remove" v-on:click="actionCallback('remove', data.id)">
          <TrashCanOutline title="Remove EngagementPopup" :size="18"/>
        </a>
      </div>
    </div>
    <div class="dh-engagementpopup_preview-wrapper">
      <DHField label="Preview" :value="''" size="small" weight="normal" color="black" shadow="false" />
      <div v-if="!hideControls" class="dh-engagementpopup_preview-close">
        <a class="engpopup_close" :style="`;background-color:${backgroundColor};`" >
          <MDClose id="id-control-close" title="Close Engagement Popup" :fillColor="data.controlsColor" :size="18"/>
        </a>
      </div>
      <div v-html="data.content" class="dh-engagementpopup_preview-content"></div>
      <div v-if="!hideControls" class="dh-engagementpopup_preview-noshow">
        <div class="dh-engagementpopup_preview-noshow-content" :style="`background-color:${backgroundColor};`">
          <input id="id-control-noshow" type="checkbox" name="">
          <span id="id-control-noshow-text" :style="`color:${data.controlsColor};`">Click here if you would like to stop seeing this message</span>
        </div>
      </div>
    </div>
    <div class="dh-engagementpopup_data-description">
      <DHField label="Description" :value="''" size="small" weight="normal" color="black" shadow="false" />
      <DHField id="id-data-description" label="" :value="data ? data.description : '[None]'" size="small" weight="normal" color="black" shadow="false" />
    </div>
    <div class="dh-engagementpopup_row">
      <DHField label="ID:" :value="data ? data.id : '[None]'" size="small" weight="normal" color="gray" shadow="false" />
      <DHField id="id-data-lastModified" label="Last Modified:" :value="data ? data.lastModified : '[None]'" size="small" weight="normal" color="black" shadow="false" time="true" />
    </div>
    <div class="dh-engagementpopup_row">
      <DHField id="id-data-color" label="Controls color:" :value="data ? data.controlsColor : '[None]'" size="small" weight="normal" color="black" shadow="false" />
      <DHField id="id-data-shadow" label="Controls shadow:" :value="data ? data.controlsShadow : '[None]'" size="small" weight="normal" color="black" shadow="false" />
    </div>
  </div>
</template>
<script>
import DHMixin from '@/mixins/dh-mixin.js';
import DHField from '@/components/dh-field'
import PlaylistEdit from 'vue-material-design-icons/PlaylistEdit'
import TrashCanOutline  from 'vue-material-design-icons/TrashCanOutline'
import MDClose  from 'vue-material-design-icons/Close'
export default {
  name: 'DHEngagementPopup',
  props: ['data','hideControls','actionCallback'],
  mixins: [DHMixin],
  data: function() {
    return {
      opacity: 0.6
    }
  },
  components: {
    DHField,
    PlaylistEdit,
    TrashCanOutline,
    MDClose
  },
  computed: {
    getColorClass: {
      get: function() {
        let val = (!this.data || !this.data.controlsColor) ? 'black' : this.data.controlsColor;
        return this.getEngPopColorClass(val);
      }
    },
    getShadowClass: {
      get: function() {
        let val = (!this.data || !this.data.controlsShadow) ? 'white' : this.data.controlsShadow;
        return this.getEngPopShadowClass(val);
      }
    },
    backgroundColor: {
      get: function() {
        let result = `rgba(0,0,0,${this.opacity})`;
        if (!this.data) {
          return result;
        }
        switch(this.data.controlsShadow) {
          case 'black': return result;
          case 'white': return `rgba(255,255,255,${this.opacity})`;
          case 'navy': return `rgba(22,46,81,${this.opacity})`;
          case 'gray': return `rgba(204,204,204,${this.opacity})`;
          case 'darkgray': return `rgba(128,128,128,${this.opacity})`;
          case 'green': return `rgba(0,128,0,${this.opacity})`;
          case 'red': return `rgba(255,0,0,${this.opacity})`;
          case 'darkred': return `rgba(217,0,0,${this.opacity})`;
          case 'blue': return `rgba(0,0,255,${this.opacity})`;
          case 'orange': return `rgba(255,165,0,${this.opacity})`;
          case 'transparent': return `rgba(0,0,0,0)`;
        }
        return result;
      }
    }

  }
}
</script>
