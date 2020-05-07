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
        <span id="id-control-close" :class="getColorClass+' '+getShadowClass">x</span>
      </div>
      <div v-html="data.content" class="dh-engagementpopup_preview-content"></div>
      <div v-if="!hideControls" class="dh-engagementpopup_preview-noshow">
        <input id="id-control-noshow" type="checkbox" name="">
        <span id="id-control-noshow-text" :class="getColorClass+' '+getShadowClass">Click here if you would like to stop seeing this message</span>
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
export default {
  name: 'DHEngagementPopup',
  props: ['data','hideControls','actionCallback'],
  mixins: [DHMixin],
  components: {
    DHField,
    PlaylistEdit,
    TrashCanOutline
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
    }
  }
}
</script>
