<template>
  <div class="engagementPopups_wrapper">
    <div class="engagementPopups_controls">
      <div class="cdh_column cdh_column_width-100">
        <div class="cdh_row cdh_input">
          <button id="id-engagementPopup-refresh" :disabled="forbidden" v-if="isVisible" v-on:click="listEngagementPopups()">Refresh</button>
          <button id="id-engagementPopup-add" :disabled="forbidden" v-if="isVisible" v-on:click="addEngagementPopup()">Add</button>
          <input id="id-engagementPopup-filter" :disabled="forbidden" v-if="isVisible" type="search" name="engagementPopups-search" v-model="engagementPopupFilter" placeholder="Filter Engagement Popups...">
        </div>
        <div class="cdh_row cdh_input">
          <label v-if="isVisible" id="id-number-engagementPopups" :key="refreshCounter">Engagement Popups: {{this.$store.state.numberOfEngagementPopups}}</label>
        </div>
      </div>
    </div>
    <router-view name="engagementPopups" :key="$route.fullPath"></router-view>
  </div>
</template>
<script>
import DHMixin from '@/mixins/dh-mixin.js'
export default {
  name: 'EngagementPopups',
  mixins: [DHMixin],
  data: function() {
    return {
      refreshCounter: 0
    }
  },
  computed: {
    isSelected: {
      get: function() {return this.$store.state.engagementPopups.filter(x => x.selected).length > 0;}
    },
    isVisible: {
      get: function() {  return this.$route.name == 'engagementPopups-home'; }
    },
    engagementPopupFilter: {
      get: function() {
          return this.$store.state.engagementPopupFilter;
        },
      set: function(val) {
          let v = val ? val : '';
          this.$store.commit('setEngagementPopupFilter', v);
          this.forceUpdate();
        }
    },
    forbidden: {
      get: function() { return this.$store.state.forbidden; }
    }
  },
  methods: {
    listEngagementPopups: function() {
      this.clearActionState();
      if (this.$route.path == "/engagementpopups") {
        this.$store.dispatch('getEngagementPopups');
      } else {
        this.$router.push({path:"/engagementpopups"});
      }
    },
    addEngagementPopup: function() {
      this.clearActionState();
      this.$router.push({path:"/engagementpopups/add"});
    },
    forceUpdate: function() {
      this.refreshCounter += 1;
    }
  }
}
</script>
