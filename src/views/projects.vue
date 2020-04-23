<template>
  <div class="projects_wrapper">
    <div class="projects_controls">
      <div class="cdh_column cdh_column_width-100">
        <div class="cdh_row cdh_input">
          <button :disabled="forbidden" v-if="isVisible" v-on:click="listProjects()">Refresh</button>
          <button :disabled="forbidden" v-if="isVisible" v-on:click="addProject()">Add</button>
          <input :disabled="forbidden" v-if="isVisible" type="search" name="projects-search" id="id-projects-search" v-model="projectsFilter" placeholder="Filter projects...">
        </div>
        <div class="cdh_row cdh_input">
          <label v-if="isVisible" id="id-number-projects" :key="refreshCounter">Projects: {{this.$store.state.numberOfProjects}}</label>
        </div>
      </div>
    </div>
    <router-view name="projects" :key="$route.fullPath"></router-view>
  </div>
</template>
<script>
import DHMixin from '@/mixins/dh-mixin.js'
export default {
  name: 'Projects',
  mixins: [DHMixin],
  data: function() {
    return {
      refreshCounter: 0
    }
  },
  computed: {
    isSelected: {
      get: function() {return this.$store.state.projects.filter(x => x.selected).length > 0;}
    },
    isVisible: {
      get: function() {  return this.$route.name == 'projects-home'; }
    },
    projectsFilter: {
      get: function() { 
          return this.$store.state.projectsFilter;
        },
      set: function(val) { 
          let v = val ? val : '';
          this.$store.commit('setProjectsFilter', v);
          this.forceUpdate();
        }
    },
    forbidden: {
      get: function() { return this.$store.state.forbidden; }
    }
  },
  methods: {
    listProjects: function() {
      this.clearActionState();
      if (this.$route.path == "/projects") {
        this.$store.dispatch('getProjects');
      } else {
        this.$router.push({path:"/projects"});
      }
    },
    addProject: function() {
      this.clearActionState();
      this.$router.push({path:"/projects/add"});
    },
    forceUpdate: function() {
      this.refreshCounter += 1;
    }
  }
}
</script>