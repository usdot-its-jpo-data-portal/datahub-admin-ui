<template>
  <div class="cdh_row cdh_row_justify-center">
    <div class="cdh_column cdh_column_max-width-tablet">
      <h2>Update Data Asset</h2>
    
      <div v-if="processingError || error" :class="processingError || error ? 'cdh_message-alert':''">
        <span id="id-dataasset-error-message">{{processingMessage + message}}</span>
      </div>
      <div v-if="processing" :class="processing ? 'cdh_message-action':''">
        <span id="id-dataasset-processing-message">{{message}}</span>
      </div>
      <hr v-if="processing || error">
      <div class="cdh_message">
        <p>Type the word "Update" in the next input box and press the "Update" button to confirm.</p>
      </div>
      <div :class="invalidConfirmation ? 'cdh_row cdh_input cdh_input-alert' : 'cdh_row cdh_input'">
        <input id="id-dataasset-input-confirmation" type="text" v-model="confirmation" placeholder="Confirmation...">
        <button id="id-dataasset-button-update" v-on:click="updateClicked">Update</button>
        <button id="id-dataasset-button-cancel" v-on:click="cancelClicked">Cancel</button>
      </div>
      <hr>
      <div class="cdh_row">
        <DHField id="id-dataasset-name" label="Name: " :value="selectedDataAsset ? selectedDataAsset.name : ''" size="medium" weight="bold" color="green"/>
      </div>
      <div class="cdh_row">
        <DHField id="id-dataasset-id" label="ID: " :value="selectedDataAsset ? selectedDataAsset.id : ''" size="medium" weight="normal" color="black"/>
        <DHField id="id-dataasset-lastupdate" label="LastUpdate: " :value="selectedDataAsset ? selectedDataAsset.lastUpdate : ''" size="medium" weight="normal" color="black" time="true"/>
      </div>
      <div class="cdh_row">
        <DHField id="id-dataasset-dhid" label="DHID: " :value="selectedDataAsset ? selectedDataAsset.dhId : ''" size="medium" weight="normal" color="black"/>
        <DHField id="id-dataasset-dhsourcename" label="DHSourceName: " :value="selectedDataAsset ? selectedDataAsset.dhSourceName : ''" size="medium" weight="normal" color="black"/>
        <DHField id="id-dataasset-dhlastupdate" label="DHLastUpdate: " :value="selectedDataAsset ? selectedDataAsset.dhLastUpdate : ''" size="medium" weight="normal" color="black" time="true"/>
      </div>
      <hr>
      <DHField id="id-dataasset-projects" :label="'Projects'" :value="''" size="small" weight="normal" color="gray"/>
      <div class="cdh_input">
            <div class="cdh_row cdh_row_align-center" v-for="(item, index) in projects" :key="index">
              <input :id="'id-dataasset-project-'+index" type="checkbox" v-model="item.selected">
              <DHField :id="'id-dataasset-project-label-'+index" :label="''" :value="item.name" size="medium" weight="normal" color="black"/>
            </div>
      </div>
      <hr>
      <DHField id="id-dataasset-datatypes" :label="'Data Types'" :value="''" size="small" weight="normal" color="gray"/>
      <div class="cdh_input">
            <div class="cdh_row cdh_row_align-center" v-for="(item, index) in dataTypes" :key="index">
              <input :id="'id-dataasset-datatype-'+index" type="checkbox" v-model="item.selected">
              <DHField :id="'id-dataasset-datatype-label-'+index" :label="''" :value="item.name" size="medium" weight="normal" color="black"/>
            </div>
      </div>
    </div>
  </div>
</template>
<script>
import DHField from '@/components/dh-field';
export default {
  name: "DataAssetsUpdate",
  components: {
    DHField
  },
  data: function() {
    return {
      message: '',
      error: false,
      selectedDataAsset : null,
      confirmation: '',
      invalidConfirmation: false,
      projects: [],
      dataTypes: []
    }
  },
  created: function() {
    if (!this.$store.state.selectedDataAsset) {
      this.$router.push({path: '/dataassets'});
    }

    this.selectedDataAsset = this.$store.state.selectedDataAsset;
    let projs = [...this.$store.state.projects.filter(x => x.isEnabled)];
    projs.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
    projs.forEach(x => x.selected = false);

    let dats = [...this.$store.state.dataTypes.filter(x => x.isEnabled)];
    dats.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()? 1 : -1));
    dats.forEach(x => x.selected = false);

    if (!this.selectedDataAsset) {
      this.projects = projs;
      this.dataTypes = dats;
      return;
    }

    if (!this.selectedDataAsset.dhProjects || this.selectedDataAsset.dhProjects.length==0) {
      this.projects = projs;
    } else {
      for(let i=0; i<this.selectedDataAsset.dhProjects.length; i++) {
        let prj = this.selectedDataAsset.dhProjects[i];
        let filPrj = projs.filter(x => x.id == prj.id);
        if (filPrj.length > 0)
        {
          filPrj[0].selected = true;
        }
      }
      this.projects = projs;
    }

    if (!this.selectedDataAsset.dhDataTypes || this.selectedDataAsset.dhDataTypes.length==0) {
      this.dataTypes = dats;
    } else {
      for(let i=0; i<this.selectedDataAsset.dhDataTypes.length; i++) {
        let dat = this.selectedDataAsset.dhDataTypes[i];
        let filDat = dats.filter(x => x.id == dat.id);
        if (filDat.length > 0)
        {
          filDat[0].selected = true;
        }
      }
      this.dataTypes = dats;
    }

  },
  computed: {
    processing: {
      get: function() {return this.$store.state.is_processing; },
      set: function(val) { this.$store.commit('setIsProcessing', val)}
    },
    processingMessage: {
      get: function() {return this.$store.state.processing_message;},
      set: function(val) {this.$store.state.processing_message = val;}
    },
    processingError: {
      get: function() {return this.$store.state.processing_error; }
    },
    processingId: {
      get: function() {return this.$store.state.processing_id; }
    }
  },
  watch: {
    processing: function(newValue, oldValue) {
      if (oldValue && !newValue) {
        if (this.processingId === 'UpdateDataAsset') {
          this.closeView();
        }
      }
    }
  },
  methods: {
    cancelClicked: function() {
      this.$router.push({path:'/dataassets'});
    },
    updateClicked: function() {
      this.invalidConfirmation = this.confirmation != 'Update';
      this.error = this.invalidConfirmation;
      if (this.error) {
        this.message = 'Invalid field value.'
      } else if (!this.invalidConfirmation) {
        this.selectedDataAsset.dhProjects = this.projects.map( x => x.selected ? x.id : null).filter( x => x != null);
        this.selectedDataAsset.dhDataTypes = this.dataTypes.map( x => x.selected ? x.id : null).filter( x => x != null);
        let transacData = {
          data: this.selectedDataAsset,
          id: 'UpdateDataAsset'
        };
        this.$store.dispatch('updateDataAsset', transacData);
      }
    },
    closeView: function() {
      if (!this.$store.state.processing_error) {
        this.processing = true;
        this.message = 'Processing...';
        this.$store.dispatch('getDataAssets');
        setTimeout(() => {
          this.message ='Done!';
          this.$router.push({path: '/dataassets'});
        }, 500);
      }
    }
  }
}
</script>
