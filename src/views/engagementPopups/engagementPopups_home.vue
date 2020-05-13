<template>
  <div class="engagementPopups-home_wrapper">
      <div v-if="!forbidden" class="engagementPopups-home_items">
        <DHEngagementPopup v-for="(item, index) in engagementPopups" :key="index" :data="item" :actionCallback="actionCallback" :hideControls="false" />
      </div>
      <div v-else>
        <DHForbidden/>
    </div>
  </div>
</template>
<script>
import DHMixin from '@/mixins/dh-mixin.js';
import DHEngagementPopup from '@/components/dh-engagementpopup.vue';
import DHForbidden from '@/components/dh-forbidden.vue';
export default {
  name: "EngagementPopupHome",
  mixins: [DHMixin],
  components: {
    DHEngagementPopup,
    DHForbidden
  },
  data: function() {
    return {
      refreshCounter: 0
    }
  },
  created: function() {
    this.$store.dispatch('getEngagementPopups');
  },
  computed: {
    engagementPopups: {
      get: function() {
        let flt = this.$store.state.engagementPopupFilter;
        let dat = this.$store.state.engagementPopups.filter( x => {
          return x.name.toLowerCase().match(flt.toLowerCase())
        });
        this.$store.commit('setNumberOfEngagementPopups', dat.length);
        return dat;
      }
    },
    forbidden: {
      get: function() {return this.$store.state.forbidden;}
    },
    processing: {
      get: function() { return this.$store.state.is_processing; }
    },
    processingId: {
      get: function() {return this.$store.state.processing_id; }
    }
  },
  watch: {
    processing: function(newValue, oldValue) {
      if (oldValue && !newValue) {
        if (this.processingId === 'GET-ENGAGEMENT-POPUPS') {
          this.refreshCounter += 1;
        }
      }
    }
  },
  methods: {
    actionCallback: function(type,id){
      let data = this.$store.state.engagementPopups.filter(x => x.id == id);
      if (data.length == 0) {
        return;
      }
      this.clearActionState();
      this.$store.commit('setSelectedEngagementPopup', data[0]);

      switch(type.toLowerCase()) {
        case 'update':
          this.$router.push({path:"/engagementpopups/update"});
          break;
        case 'remove':
          this.$router.push({path:"/engagementpopups/remove"})
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.engagementPopups-home_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  .engagementPopups-home_items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: stretch;
  }
}
</style>
