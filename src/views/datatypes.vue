<template>
  <div class="datatypes_wrapper">
    <div class="datatypes_controls">
      <div class="cdh_column cdh_column_width-100">
        <div class="cdh_row cdh_input">
          <button :disabled="forbidden" v-if="isVisible" v-on:click="listDataTypes()">Refresh</button>
          <button :disabled="forbidden" v-if="isVisible" v-on:click="addDataType()">Add</button>
          <input :disabled="forbidden" v-if="isVisible" type="search" name="datatypes-search" id="id-datatypes-search" v-model="dataTypesFilter" placeholder="Filter data types...">
        </div>
        <div class="cdh_row cdh_input">
          <label v-if="isVisible" id="id-number-datatypes" :key="refreshCounter">Data Types: {{this.$store.state.numberOfDataTypes}}</label>
        </div>
      </div>
    </div>
    <router-view name="datatypes" :key="$route.fullPath"></router-view>
  </div>
</template>
<script>
import DHMixin from '@/mixins/dh-mixin.js'
export default {
  name: 'DataTypes',
  mixins: [DHMixin],
  data: function() {
    return {
      refreshCounter: 0
    }
  },
  computed: {
    isSelected: {
      get: function() {return this.$store.state.dataTypes.filter(x => x.selected).length > 0;}
    },
    isVisible: {
      get: function() {  return this.$route.name == 'datatypes-home'; }
    },
    dataTypesFilter: {
      get: function() {
          return this.$store.state.dataTypesFilter;
        },
      set: function(val) {
          let v = val ? val : '';
          this.$store.commit('setDataTypesFilter', v);
          this.forceUpdate();
        }
    },
    forbidden: {
      get: function() { return this.$store.state.forbidden; }
    }
  },
  methods: {
    listDataTypes: function() {
      this.clearActionState();
      if (this.$route.path == "/datatypes") {
        this.$store.dispatch('getDataTypes');
      } else {
        this.$router.push({path:"/datatypes"});
      }
    },
    addDataType: function() {
      this.clearActionState();
      this.$router.push({path:"/datatypes/add"});
    },
    forceUpdate: function() {
      this.refreshCounter += 1;
    }
  }
}
</script>