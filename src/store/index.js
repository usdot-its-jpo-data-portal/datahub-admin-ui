import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Utils from '@/utils/utils.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    is_mobile: false,
    auth_token: '',
    version: process.env.VUE_APP_PACKAGE_VERSION,
    is_processing: false,
    processing_error: false,
    processing_message: '',
    processing_id: null,
    dataAssets: [],
    selectedDataAsset: null,
    dataAssetsFilter: '',
    numberOfDataAssets: 0,
    projects: [],
    selectedProject: null,
    projectsFilter: '',
    numberOfProjects: 0,
    forbidden: false
  },
  mutations: {
    setIsMobile(state, val) {
      state.is_mobile = val;
    },
    setAuthToken(state, val) {
      state.auth_token = val;
    },
    setIsProcessing(state, val) {
      state.is_processing = val;
    },
    setProcessingError(state, val) {
      state.processing_error = val;
    },
    setProcessingMessage(state, val) {
      state.processing_message = val;
    },
    setProcessingId(state, val) {
      state.processing_id = val;
    },
    setDataAssets(state, val) {
      state.dataAssets = val;
    },
    setSelectedDataAsset(state, val) {
      state.selectedDataAsset = val;
    },
    setProjects(state, val) {
      state.projects = val;
    },
    setSelectedProject(state, val) {
      state.selectedProject = val;
    },
    setDataAssetsFilter(state, val) {
      state.dataAssetsFilter = val;
    },
    setProjectsFilter(state, val) {
      state.projectsFilter = val;
    },
    setNumberOfDataAssets(state, val) {
      state.numberOfDataAssets = val;
    },
    setNumberOfProjects(state, val) {
      state.numberOfProjects = val;
    },
    setForbidden(state, val) {
      state.forbidden = val;
    }
  },
  actions: {
    getDataAssets: function({commit, state}) {
      commit('setForbidden', false);
      if (state.auth_token == '') {
        commit('setForbidden', true);
        return;
      }
      commit('setForbidden', false);
      commit('setProcessingId', 'GET-DATA-ASSETS');
      commit('setIsProcessing', true);
      commit('setProcessingError', false);
      commit('setProcessingMessage', 'Processing...')
      commit('setDataAssets', []);

      let headers= { 'Content-Type':'application/json', 'DHTOKEN':state.auth_token };

      const dataAssetsCall = axios({
        method: 'GET',
        headers: headers,
        crossDomain: true,
        url: '/api/v1/dataassets'
      });

      const projectsCall = axios({
        method: 'GET',
        headers: headers,
        crossDomain: true,
        url: '/api/v1/configurations/projects'
      });

      Promise.all([dataAssetsCall, projectsCall])
      .then( response => {
        let dataAssetsResp = response[0];
        let projectsResp = response[1];
        if (Utils.validResponse(dataAssetsResp) && Utils.validResponse(projectsResp)) {
          commit('setProjects', projectsResp.data.result);
          let das = dataAssetsResp.data.result.slice();
          for(let i=0; i<das.length; i++) {
            das[i] = Utils.resolveProjects(das[i],state.projects);
          }
          commit('setDataAssets', das);
        } else {
          commit('setProcessingError', false);
          commit('setProcessingMessage', '')
        }
        commit('setIsProcessing', false);
      })
      .catch( (error) => {
        commit('setForbidden', error.response.status == 403)
        commit('setProcessingError', true);
        commit('setProcessingMessage', error.response.statusText);
        commit('setIsProcessing', false);
      })
    },
    getProjects: function({commit, state}) {
      commit('setForbidden', false);
      if (state.auth_token == '') {
        commit('setForbidden', true);
        return;
      }
      commit('setProcessingId', 'GET-PROJECTS');
      commit('setIsProcessing', true);
      commit('setProcessingError', false);
      commit('setProcessingMessage', 'Processing...')
      commit('setProjects', []);

      let options = {
        headers: { 'Content-Type':'application/json', 'DHTOKEN':state.auth_token }
      }

      axios
      .get('/api/v1/configurations/projects', options)
      .then( response => {
        if (Utils.validResponse(response)) {
          let pData = [...response.data.result];
          pData.sort((a,b) => {
            if (a.name >= b.name) {
              return 1;
            }
            return -1;
          });
          commit('setProjects', pData);
        } else {
          let msg = Utils.getErrorMessages(response);
          commit('setProcessingError', true);
          commit('setProcessingMessage', msg)
        }
        commit('setIsProcessing', false);
      })
      .catch( (error) => {
        commit('setForbidden', error.response.status == 403)
        commit('setProcessingError', true);
        commit('setProcessingMessage',  error.response.statusText);
        commit('setIsProcessing', false);
      })
    },
    updateDataAsset({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      commit('setIsProcessing', true);
      commit('setProcessingError', false);
      commit('setProcessingMessage', 'Processing...')

      let options =  {
        headers: {
          'Content-Type':'application/json',
          'DHTOKEN': state.auth_token
        }
      };
      axios
      .put('/api/v1/dataassets', transacData.data, options)
      .then( response => {
        if (!Utils.validResponse(response)) {
          let msg = Utils.getErrorMessages(response);
          commit('setProcessingError', true);
          commit('setProcessingMessage', msg);
        }
        commit('setIsProcessing', false);
      })
      .catch( (error) => {
        commit('setProcessingError', true);
        commit('setProcessingMessage', error);
        commit('setIsProcessing', false);
      })
    },
    updateProject({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      commit('setIsProcessing', true);
      commit('setProcessingError', false);
      commit('setProcessingMessage', 'Processing...')

      let options =  {
        headers: {
          'Content-Type':'application/json',
          'DHTOKEN': state.auth_token
        }
      };
      axios
      .put('/api/v1/configurations/projects', transacData.data, options)
      .then( response => {
        if (!Utils.validResponse(response)) {
          let msg = Utils.getErrorMessages(response);
          commit('setProcessingError', true);
          commit('setProcessingMessage', msg);
        }
        commit('setIsProcessing', false);
      })
      .catch( (error) => {
        commit('setProcessingError', true);
        commit('setProcessingMessage', error);
        commit('setIsProcessing', false);
      })
    },
    removeProject({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      commit('setIsProcessing', true);
      commit('setProcessingError', false);
      commit('setProcessingMessage', 'Processing...')

      let options =  {
        headers: {
          'Content-Type':'application/json',
          'DHTOKEN': state.auth_token
        }
      };
      axios
      .delete(`/api/v1/configurations/projects/${transacData.data.id}`, options)
      .then( response => {
        if (!Utils.validResponse(response)) {
          let msg = Utils.getErrorMessages(response);
          commit('setProcessingError', true);
          commit('setProcessingMessage', msg);
        }
        commit('setIsProcessing', false);
      })
      .catch( (error) => {
        commit('setProcessingError', true);
        commit('setProcessingMessage', error);
        commit('setIsProcessing', false);
      })
    },
    addProject({commit, state}, transacData) {
      commit('setProcessingId', transacData.id);
      commit('setIsProcessing', true);
      commit('setProcessingError', false);
      commit('setProcessingMessage', 'Processing...')

      let options =  {
        headers: {
          'Content-Type':'application/json',
          'DHTOKEN': state.auth_token
        }
      };
      axios
      .post(`/api/v1/configurations/projects`, transacData.data, options)
      .then( response => {
        if (!Utils.validResponse(response)) {
          let msg = Utils.getErrorMessages(response);
          commit('setProcessingError', true);
          commit('setProcessingMessage', msg);
        }
        commit('setIsProcessing', false);
      })
      .catch( (error) => {
        commit('setProcessingError', true);
        commit('setProcessingMessage', error);
        commit('setIsProcessing', false);
      })
    }
  },
  modules: {
  }
})
