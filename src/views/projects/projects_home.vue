<template>
  <div class="projects-home_wrapper">
      <div v-if="!forbidden" class="projects-home_items">
        <DHProject v-for="(item, index) in projects" :key="index" :data="item" :actionCallback="actionCallback"/>
      </div>
      <div v-else>
        <DHForbidden/>
    </div>
  </div>
</template>
<script>
import DHMixin from '@/mixins/dh-mixin.js'
import DHProject from '@/components/dh-project'
import DHForbidden from '@/components/dh-forbidden.vue';
export default {
  name: "ProjectsHome",
  mixins: [DHMixin],
  components: {
    DHProject,
    DHForbidden
  },
  data: function() {
    return {
      refreshCounter: 0
    }
  },
  created: function() {
    this.$store.dispatch('getProjects');
  },
  computed: {
    projects: {
      get: function() {
        let flt = this.$store.state.projectsFilter;
        let dat = this.$store.state.projects.filter( x => {
          return x.name.toLowerCase().match(flt.toLowerCase())
        });
        this.$store.commit('setNumberOfProjects', dat.length);
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
        if (this.processingId === 'GET-PROJECT') {
          this.refreshCounter += 1;
        }
      }
    }
  },
  methods: {
    actionCallback: function(type,id){
      let data = this.$store.state.projects.filter(x => x.id == id);
      if (data.length == 0) {
        return;
      }
      this.clearActionState();
      this.$store.commit('setSelectedProject', data[0]);

      switch(type.toLowerCase()) {
        case 'update':
          this.$router.push({path:"/projects/update"});
          break;
        case 'remove':
          this.$router.push({path:"/projects/remove"})
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.projects-home_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  .projects-home_items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: stretch;
  }
}
</style>