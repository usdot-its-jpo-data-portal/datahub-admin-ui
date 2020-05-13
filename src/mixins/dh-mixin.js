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
      this.$store.commit('setSelectedEngagementPopup', null);
    },
    getColors: function() {
      return [
        {color:'white', value: 'white'},
        {color:'black', value: 'black'},
        {color:'navy', value: 'navy'},
        {color:'gray', value: 'gray'},
        {color:'darkgray', value: 'darkgray'},
        {color:'green', value: 'green'},
        {color:'red', value: 'red'},
        {color:'darkred', value: 'darkred'},
        {color:'blue', value: 'blue'},
        {color:'orange', value: 'orange'},
        {color:'transparent', value: 'transparent'}
      ]
    },
    getEngPopColorClass: function(colorValue) {
      if (!colorValue) {
        return "dh-engpop-color-black";
      }
      switch (colorValue) {
        case 'white': return 'dh-engpop-color-white';
        case 'black': return 'dh-engpop-color-black';
        case 'navy': return 'dh-engpop-color-navy';
        case 'gray': return 'dh-engpop-color-gray';
        case 'darkgray': return 'dh-engpop-color-darkgray';
        case 'green': return 'dh-engpop-color-green';
        case 'red': return 'dh-engpop-color-red';
        case 'darkred': return 'dh-engpop-color-darkred';
        case 'blue': return 'dh-engpop-color-blue';
        case 'orange': return 'dh-engpop-color-orange';
        default: return 'dh-engpop-color-black';
      }
    },
    getEngPopShadowClass: function(colorValue) {
      if (!colorValue) {
        return "dh-engpop-shadow-white";
      }
      switch (colorValue) {
        case 'white': return 'dh-engpop-shadow-white';
        case 'black': return 'dh-engpop-shadow-black';
        case 'navy': return 'dh-engpop-shadow-navy';
        case 'gray': return 'dh-engpop-shadow-gray';
        case 'darkgray': return 'dh-engpop-shadow-darkgray';
        case 'green': return 'dh-engpop-shadow-green';
        case 'red': return 'dh-engpop-shadow-red';
        case 'darkred': return 'dh-engpop-shadow-darkred';
        case 'blue': return 'dh-engpop-shadow-blue';
        case 'orange': return 'dh-engpop-shadow-orange';
        default: return 'dh-engpop-shadow-white';
      }
    }
  }
}
