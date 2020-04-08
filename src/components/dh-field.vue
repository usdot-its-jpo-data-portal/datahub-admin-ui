<template>
  <div class="dh-field--wrapper">
    <span class="dh-field--label">
      {{ label }}
    </span>
    <span v-if="islink" class="dh-field--value" :class="[sizeClass, weightClass, colorClass, shadowClass]" >
      <a :href="value" target="_blank">{{ value }}</a>
    </span>
    <span v-else-if="isTime" class="dh-field--value" :class="[sizeClass, weightClass, colorClass, , shadowClass]" >
      {{ value | fildate }}
    </span>
    <span v-else class="dh-field--value" :class="[sizeClass, weightClass, colorClass, , shadowClass]" >
      {{ value }}
    </span>
  </div>
</template>
<script>
import moment from 'moment';

export default {
  name: 'DHField',
  props: ['label','value','size', 'weight', 'color', 'link', 'shadow', 'time'],
  filters: {
    fildate: function(date) {
      if (date) {
        return moment(date).format('YYYY-MM-DDTHH:mm:ss')+'Z';
      }
      return '';
    }
  },
  computed: {
    isTime: { get: function() {return this.time === 'true'}},
    islink: {
      get: function() {return this.link === 'true';}
    },
    shadowClass: {
      get: function() {
        if (this.shadow === 'true') {
          return 'dh-field--value-shadow';
        } else {
          return '';
        }
      }
    },
    sizeClass : {
      get: function() {
        if (this.size === 'smaller') {
          return 'dh-field--value-smaller';
        } else if (this.size === 'small') {
          return 'dh-field--value-small';
        } else if (this.size === 'large') {
          return 'dh-field--value-large';
        } else if (this.size === 'larger') {
          return 'dh-field--value-larger';
        } 
        return 'dh-field--value-medium';
      }
    },
    weightClass : {
      get: function() {
        if (this.weight === 'bold') {
          return 'dh-field--value-bold';
        } 
        return 'dh-field--value-normal';
      }
    },
    colorClass : {
      get: function() {
        if (this.color === 'blue') {
          return 'dh-field--value-blue';
        } else if (this.color === 'green') {
          return 'dh-field--value-green'
        } else if (this.color === 'navy') {
          return 'dh-field--value-navy'
        } else if (this.color === 'gray') {
          return 'dh-field--value-gray'
        } else if (this.color === 'lighgray') {
          return 'dh-field--value-lightgray'
        } else if (this.color === 'red') {
          return 'dh-field--value-red'
        } else {
          return 'dh-field--value-black';
        }
      }
    }
  }
}
</script>