<template>
  <div class="dataassets_wrapper">
    <div class="dataassets_controls">
      <div class="cdh_column cdh_column_width-100">
        <div class="cdh_row cdh_input">
          <button :disabled="forbidden" v-if="isVisible" v-on:click="listDataAssets()">Refresh</button>
          <input :disabled="forbidden" v-if="isVisible" type="search" name="dataassets-search" id="id-dataassets-search" v-model="dataAssetsFilter" placeholder="Filter data assets...">
        </div>
        <div class="cdh_row cdh_input">
          <label id="id-number-dataAssets" :key="refreshCounter">Data Assets: {{this.$store.state.numberOfDataAssets}}</label>
        </div>
      </div>
    </div>
    <router-view name="dataassets" :key="$route.fullPath"></router-view> 
  </div>
</template>
<script>
import DHMixin from '@/mixins/dh-mixin.js'
export default {
  name: 'DataAssets',
  mixins: [DHMixin],
  data: function() {
    return {
      refreshCounter: 0
    }
  },
  computed: {
    isVisible: {
      get: function() {  return this.$route.name == 'dataassets-home'; }
    },
    dataAssetsFilter: {
      get: function() { 
          return this.$store.state.dataAssetsFilter;
        },
      set: function(val) { 
          let v = val ? val : '';
          this.forceRefresh();
          this.$store.commit('setDataAssetsFilter', v);
        }
    },
    forbidden: {
      get: function() { return this.$store.state.forbidden; }
    }
  },
  methods: {
    listDataAssets: function() {
      this.clearActionState();
      if (this.$route.path == "/dataassets") {
        this.$store.dispatch('getDataAssets');
      } else {
        this.$router.push({path:"/dataassets"});
      }
    },
    forceRefresh: function() {
      this.refreshCounter += 1;
    }
  }
}
</script>