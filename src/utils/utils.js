export default {
    validResponse(response) {
      return response && response.status && response.status === 200 && response.data && [200, 204].includes(response.data.code);
    },
    getErrorMessages(response) {
      if (!this.validResponse(response)) {
        if (response.data) {
          let msg = response.data.status;
          if (response.data.errors && response.data.errors.length > 0) {
            for(let i=0 ; i<response.data.errors.length; i++) {
              msg += ' => '+response.data.errors[i].message;
            }
          }
          return msg;
        }
      }
      return '';
    },
    resolveProjects(dataAsset, projects) {
      if (!dataAsset || !dataAsset.dhProjects || dataAsset.dhProjects.length == 0  ) {
        return dataAsset;
      }

      for(let i=0; i<dataAsset.dhProjects.length; i++){
        let projId = dataAsset.dhProjects[i];
        let prj = projects.filter(x => x.id == projId )
        if (prj.length == 0) {
          continue;
        }
        dataAsset.dhProjects[i] = prj[0];
      }
      return dataAsset;
    },
    resolveDataTypes(dataAsset, dataTypes) {
      if (!dataAsset || !dataAsset.dhDataTypes || dataAsset.dhDataTypes.length == 0  ) {
        return dataAsset;
      }

      for(let i=0; i<dataAsset.dhDataTypes.length; i++){
        let dtId = dataAsset.dhDataTypes[i];
        let dt = dataTypes.filter(x => x.id == dtId )
        if (dt.length == 0) {
          continue;
        }
        dataAsset.dhDataTypes[i] = dt[0];
      }
      return dataAsset;
    }
}