<template>
  <div class="forbidden_wrapper">
    <MDLock title="Forbidden" :size="48"/>
    <div class="forbidden_text">
      Forbidden
    </div>
  </div>
</template>
<script>
import MDLock from 'vue-material-design-icons/LockOutline';
export default {
  name: 'DHForbidden',
  components: {
    MDLock
  }
}
</script>
<style lang="scss" scoped>
.forbidden_wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  .forbidden_text {
    color: lighten(black, 25%);
    font-size: 3.2rem;
    font-weight: bolder;
    text-shadow: 2px 2px 2px rgba(0,0,0,0.2);
  }
}
</style>