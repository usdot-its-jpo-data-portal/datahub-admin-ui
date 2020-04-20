import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import DataTypes from '@/views/datatypes/datatypes_remove.vue';
import DATATYPES_MOCKDATA from '@/testData/datatypes.json';

describe('datatypes_remove.vue', () =>{
  let $store;
  let $route;
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    $store = {
      state: {
        is_processing: false,
        processing_id: '',
        processing_message: '',
        processing_error: false,
        selectedDataType: DATATYPES_MOCKDATA[0]
      },
      commit: function(a,b) {}, // eslint-disable-line
      dispatch: function(a) {} // eslint-disable-line
    };
    $route = {
      name: 'datatypes-remove'
    };
  });
  it('Expect to display a confirmation message to Remove', () => {
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('.cdh_message');
    expect(item.text().includes('Type the word "Delete"')).to.true;
  });
  it('Expect to have an input for the Confirmation', () => {
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('input');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('placeholder')).to.equals('Confirmation...')
  });
  it('Expect to have a button to Remove', () => {
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let items = wrapper.findAll('button');
    let found = false;
    for(let i=0; i<items.length; i++) {
      if (items.at(i).text() == 'Remove') {
        found = true;
        break;
      }
    }
    expect(found).to.be.true;
  });
  it('Expect to have a button to Cancel', () => {
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let items = wrapper.findAll('button');
    let found = false;
    for(let i=0; i<items.length; i++) {
      if (items.at(i).text() == 'Cancel') {
        found = true;
        break;
      }
    }
    expect(found).to.be.true;
  });
  it('Expect to display a DHDataType component hiding the controls', () => {
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('dhdatatype-stub');
    expect(item.is('dhdatatype-stub')).to.be.true;
    expect(item.attributes('hidecontrols')).to.equals('true');
  });
  it('Expect to display a message in case of error', () => {
    $store.state.processing_error = true;
    $store.state.processing_message = 'Error message'
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-datatype-error-message');
    expect(item.is('span')).to.be.true;
    expect(item.text()).to.equals($store.state.processing_message);
  });
  it('Expect to display a message while processing', async () => {
    $store.state.is_processing = true;
    let msg = 'Processing...';
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    wrapper.setData({message: msg});
    await wrapper.vm.$nextTick();
    let item = wrapper.find('#id-datatype-processing-message');
    expect(item.is('span')).to.be.true;
    expect(item.text()).to.equals(msg);
  });


});
