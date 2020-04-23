import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import DataTypes from '@/views/datatypes/datatypes_home.vue';
import DATATYPES_MOCKDATA from '@/testData/datatypes.json';

describe('datatypes_home.vue', () =>{
  let $store;
  let $route;
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    $store = {
      state: {
        forbidden: false,
        dataTypes: DATATYPES_MOCKDATA,
        dataTypesFilter: '',
        is_processing: false,
        processing_id: ''
      },
      commit: function(a,b) {}, // eslint-disable-line
      dispatch: function(a) {} // eslint-disable-line
    };
    $route = {
      name: 'datatypes-home'
    };
  });
  it('Expect to display the number of Data Types', () => {
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let items = wrapper.findAll('dhdatatype-stub');
    expect(items.length).to.equals(3);
  });
  it('Expect to display Forbidden component', () => {
    $store.state.forbidden = true;
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let items = wrapper.find('dhforbidden-stub');
    expect(items.is('dhforbidden-stub')).to.be.true;
  });

});
