import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import DataAssets from '@/views/dataassets/dataassets_home.vue';
import DATAASSETS_MOCKDATA from '@/testData/dataassets.json';

describe('dataassets_home.vue', () =>{
  let $store;
  let $route;
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    $store = {
      state: {
        forbidden: false,
        dataAssets: DATAASSETS_MOCKDATA,
        dataAssetsFilter: '',
        is_processing: false,
        processing_id: ''
      },
      commit: function(a,b) {}, // eslint-disable-line
      dispatch: function(a) {} // eslint-disable-line
    };
    $route = {
      name: 'dataassets-home'
    };
  });
  it('Expect to display the number of Data Assets', () => {
    const wrapper = shallowMount(DataAssets, {localVue, mocks: { $store, $route }});
    let items = wrapper.findAll('dhdataasset-stub');
    expect(items.length).to.equals(5);
  });
  it('Expect to display Forbidden component', () => {
    $store.state.forbidden = true;
    const wrapper = shallowMount(DataAssets, {localVue, mocks: { $store, $route }});
    let items = wrapper.find('dhforbidden-stub');
    expect(items.is('dhforbidden-stub')).to.be.true;
  });

});
