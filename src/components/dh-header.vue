<template>
  <div class="dh-header-wrapper">
    <div class="usa-overlay"></div>
    <header class="usa-header usa-header--extended" role="banner">
      <div class="dh-header-nav-wrapper">
        <div class="dh-header-nav">
          <div class="dh-header-nav_text">
            <div class="dh-header-nav_text-title">DataHub Admin UI</div>
            <div class="dh-header-nav_text-version">Version: {{version}}</div>
          </div>
          <div class="dh-header-nav_links">
            <nav role="navigation" class="usa-nav">
              <div class="usa-nav__inner">
                <button class="usa-nav__close">
                  <img src="/img/close.svg" alt="close">
                </button>
                <ul class="usa-nav__primary usa-accordion">
                  <li class="usa-nav__primary-item">
                    <router-link aria-controls="dh-nav1" to="/dataassets" exact-active-class="router-link-exact-active" exact>Data Assets</router-link>
                  </li>
                  <li class="usa-nav__primary-item">
                    <router-link aria-controls="dh-nav1" to="/projects" exact-active-class="router-link-exact-active" exact>Projects</router-link>
                  </li>
                  <li class="usa-nav__primary-item">
                    <router-link aria-controls="dh-nav1" to="/datatypes" exact-active-class="router-link-exact-active" exact>Data Types</router-link>
                  </li>
                  <li class="usa-nav__primary-item">
                    <router-link aria-controls="dh-nav1" to="/engagementpopups" exact-active-class="router-link-exact-active" exact>Engagement Popups</router-link>
                  </li>
                  <li class="usa-nav__primary-item">
                    <div class="dh-header-nav_token">
                      <label for="id-authorization-token">Token</label>
                      <input type="password" v-model="authToken" @keyup.enter="reloadData" name="authorization-token" id="id-authorization-token" placeholder="Authorization token...">
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <button class="usa-menu-btn" aria-controls="dh-nav">Menu</button>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'DHHeader',
  computed: {
    authToken: {
      get: function() {return this.$store.state.auth_token;},
      set: function(val) { this.$store.commit('setAuthToken', val); }
    },
    version: {
      get: function() {
        return this.$store.state.version;
      }
    }
  },
  methods: {
    reloadData: function() {
      this.$store.dispatch('getDataAssets');
    }
  }
}
</script>
