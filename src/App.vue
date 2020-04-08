<template>
  <div id="app" class="dh-app-wrapper">
    <DHHeader/>
    <router-view class="dh-app-router-view"/>
  </div>
</template>

<script>
import DHHeader from '@/components/dh-header.vue';

export default {
  name: 'app',
  components: {
    DHHeader
  },
  created: function() {
    let isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent));
    if(this.$store.state.isMobile != isMobile){
      this.$store.commit('setIsMobile', isMobile);
    }
  }
}
</script>

<style lang="scss">
@import './sass/main.scss';
</style>
