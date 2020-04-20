<template>
  <div class="datatypes-home_wrapper">
      <div v-if="!forbidden" class="datatypes-home_items">
        <DHDataType v-for="(item, index) in datatypes" :key="index" :data="item" :actionCallback="actionCallback"/>
      </div>
      <div v-else>
        <DHForbidden/>
    </div>
  </div>
</template>
<script>
import DHMixin from '@/mixins/dh-mixin.js';
import DHDataType from '@/components/dh-dataType.vue';
import DHForbidden from '@/components/dh-forbidden.vue';
export default {
  name: "DataTypesHome",
  mixins: [DHMixin],
  components: {
    DHDataType,
    DHForbidden
  },
  data: function() {
    return {
      refreshCounter: 0
    }
  },
  created: function() {
    this.$store.dispatch('getDataTypes');
  },
  computed: {
    datatypes: {
      get: function() {
        let flt = this.$store.state.dataTypesFilter;
        let dat = this.$store.state.dataTypes.filter( x => {
          return x.name.toLowerCase().match(flt.toLowerCase())
        });
        this.$store.commit('setNumberOfDataTypes', dat.length);
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
        if (this.processingId === 'GET-DATATYPES') {
          this.refreshCounter += 1;
        }
      }
    }
  },
  methods: {
    actionCallback: function(type,id){
      let data = this.$store.state.dataTypes.filter(x => x.id == id);
      if (data.length == 0) {
        return;
      }
      this.clearActionState();
      this.$store.commit('setSelectedDataType', data[0]);

      switch(type.toLowerCase()) {
        case 'update':
          this.$router.push({path:"/datatypes/update"});
          break;
        case 'remove':
          this.$router.push({path:"/datatypes/remove"})
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.datatypes-home_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  .datatypes-home_items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: stretch;
  }
}
</style>