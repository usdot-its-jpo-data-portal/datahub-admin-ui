<template>
  <div class="dataassets-home_wrapper" :key="refreshCounter">
    <div v-if="!forbidden" class="dataassets-home_items">
      <DHDataAsset v-for="(item,index) in dataAssets" :key="index+refreshCounter" :data="item" :actionCallback="actionCallback"/>
    </div>
    <div v-else>
        <DHForbidden/>
    </div>
  </div>
</template>
<script>
import DHMixin from '@/mixins/dh-mixin.js'
import DHDataAsset from '@/components/dh-dataAsset.vue';
import DHForbidden from '@/components/dh-forbidden.vue';
export default {
  name: "DataAssetsHome",
  mixins: [DHMixin],
  data: function() {
    return {
      refreshCounter: 1
    };
  },
  components : {
    DHDataAsset,
    DHForbidden
  },
  created: function() {
    this.$store.dispatch('getDataAssets');
  },
  computed: {
    dataAssets: {
      get: function() {
        let flt = this.$store.state.dataAssetsFilter;
        let dat = this.$store.state.dataAssets.filter( x => {
          return x.name.toLowerCase().match(flt.toLowerCase())
        });
        this.$store.commit('setNumberOfDataAssets', dat.length);
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
        if (this.processingId === 'GET-DATA-ASSETS') {
          this.refreshCounter += 1;
        }
      }
    }
  },
  methods: {
    actionCallback: function(type,id){
      let data = this.$store.state.dataAssets.filter(x => x.id == id);
      if (data.length == 0) {
        return;
      }
      this.clearActionState();
      this.$store.commit('setSelectedDataAsset', data[0]);

      if(type.toLowerCase() == 'update') {
          this.$router.push({path:"/dataassets/update"});
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.dataassets-home_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  .dataassets-home_items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: stretch;
  }
}
</style>