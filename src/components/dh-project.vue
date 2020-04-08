<template>
  <div class="project_wrapper">
    <div class="cdh_row cdh_row_justify-space-between">
      <div class="cdh_row">
        <DHField label="" :value="data.name" size="large" weight="bold" color="green" shadow="true" />
      </div>
      <div v-if="!hideControls">
        <a v-on:click="actionCallback('update', data.id)">
          <PlaylistEdit title="Update Project" :size="18"/>
        </a>
        <a v-on:click="actionCallback('remove', data.id)">
          <TrashCanOutline title="Remove Project" :size="18"/>
        </a>
      </div>
    </div>
    <div class="cdh_row">
        <DHField label="" :value="data.description" size="medium" weight="normal" color="black" shadow="false"/>
      </div>
    <div class="cdh_row">
      <DHField label="isEnabled:" :value="data.isEnabled" size="medium" weight="normal" color="black" />
      <DHField label="lastUpdate:" :value="data.lastModified" size="medium" weight="normal" color="black" time="true" />
    </div>
    <div class="cdh_row">
      <DHField label="id:" :value="data.id" size="small" weight="normal" color="gray" />
    </div>
  </div>
</template>
<script>
import DHField from '@/components/dh-field.vue';
import PlaylistEdit from 'vue-material-design-icons/PlaylistEdit';
import TrashCanOutline from 'vue-material-design-icons/TrashCanOutline';
export default {
  name: 'DHProject',
  props: ['data', 'hideControls', 'actionCallback'],
  components:{
    DHField,
    PlaylistEdit,
    TrashCanOutline
  }
}
</script>
