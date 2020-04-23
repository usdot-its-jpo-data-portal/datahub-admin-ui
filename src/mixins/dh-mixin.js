export default {
  methods: {
    clearActionState: function() {
      this.$store.commit('setIsProcessing', false);
      this.$store.commit('setProcessingId', '');
      this.$store.commit('setProcessingError', false);
      this.$store.commit('setProcessingMessage', '');
      this.$store.commit('setSelectedDataAsset', null);
      this.$store.commit('setSelectedProject', null);
      this.$store.commit('setForbidden', false);
      this.$store.commit('setSelectedDataType', null);
    }
  }
}