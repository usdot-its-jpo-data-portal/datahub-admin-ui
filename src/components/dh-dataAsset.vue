<template>
  <div class="dataasset_wrapper">
    <div class="cdh_row cdh_row_justify-space-between">
      <div class="cdh_row">
        <DHField label="" :value="data.name" size="large" weight="bold" color="green" shadow="true" />
      </div>
      <div v-if="!hideControls">
        <a v-on:click="actionCallback('update', data.id)">
          <PlaylistEdit title="Update Data Asset" :size="18"/>
        </a>
      </div>
    </div>
    <div class="cdh_row">
      <DHField label="id" :value="data.id" size="medium" weight="normal" color="black" />
      <DHField label="lastUpdate" :value="data.lastUpdate" size="medium" weight="normal" color="black" time="true" />
    </div>
    <div class="cdh_row">
      <DHField label="dhId" :value="data.dhId" size="medium" weight="normal" color="black" />
      <DHField label="dhSourceName" :value="data.dhSourceName" size="medium" weight="normal" color="black" />
      <DHField label="dhLastUpdate" :value="data.dhLastUpdate" size="medium" weight="normal" color="black" time="true" />
    </div>
    <div class="cdh_row">
      <div class="cdh_column">
        <DHField label="Projects" :value="''" size="medium" weight="normal" color="black" />
        <template v-if="data.dhProjects && data.dhProjects.length>0">
            <DHField  v-for="(prj, index) in data.dhProjects" :key="index" label="-" :value="prj.name" size="small" weight="normal"/>
        </template>
        <template v-else>
            <DHField label="" :value="'[None]'" size="small" weight="normal" color="lighgray"/>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import DHField from '@/components/dh-field.vue';
import PlaylistEdit from 'vue-material-design-icons/PlaylistEdit'
export default {
  name: 'DHDataAsset',
  props: ['data', 'hideControls', 'actionCallback'],
  components:{
    DHField,
    PlaylistEdit
  }
}
</script>
