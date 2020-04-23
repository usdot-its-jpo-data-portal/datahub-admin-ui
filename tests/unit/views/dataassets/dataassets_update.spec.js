import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import DataAsset from '@/views/dataassets/dataassets_update.vue';
import PROJECTS_MOCKDATA from '@/testData/projects.json';
import DATATYPES_MOCKDATA from '@/testData/datatypes.json';
import DATAASSETS_MOCKDATA from '@/testData/dataassets.json';
import Utils from '@/utils/utils.js';

describe('dataassets_update.vue', () =>{
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
        projects: PROJECTS_MOCKDATA,
        dataTypes: DATATYPES_MOCKDATA,
        selectedDataAsset: function() { 
          let da = DATAASSETS_MOCKDATA[0];
          da = Utils.resolveProjects(da, PROJECTS_MOCKDATA);
          da = Utils.resolveDataTypes(da, DATATYPES_MOCKDATA);
          return da;
        }()
      },
      commit: function(a,b) {}, // eslint-disable-line
      dispatch: function(a) {} // eslint-disable-line
    };
    $route = {
      name: 'dataassets-update'
    };
  });
  it('Expect to display a message in case of error', () => {
    $store.state.processing_error = true;
    $store.state.processing_message = 'Error message'
    const wrapper = shallowMount(DataAsset, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-dataasset-error-message');
    expect(item.is('span')).to.be.true;
    expect(item.text()).to.equals($store.state.processing_message);
  });
  it('Expect to display a message while processing', async () => {
    $store.state.is_processing = true;
    let msg = 'Processing...';
    const wrapper = shallowMount(DataAsset, {localVue, mocks: { $store, $route }});
    wrapper.setData({message: msg});
    await wrapper.vm.$nextTick();
    let item = wrapper.find('#id-dataasset-processing-message');
    expect(item.is('span')).to.be.true;
    expect(item.text()).to.equals(msg);
  });
  it('Expect to display a confirmation message to Update', () => {
    const wrapper = shallowMount(DataAsset, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('.cdh_message');
    expect(item.text().includes('Type the word "Update"')).to.true;
  });
  it('Expect to have an input for the Confirmation', () => {
    const wrapper = shallowMount(DataAsset, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-dataasset-input-confirmation');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equals('text')
    expect(item.attributes('placeholder')).to.equals('Confirmation...')
  });
  it('Expect to have a button to Update', () => {
    const wrapper = shallowMount(DataAsset, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-dataasset-button-update');
    expect(item.is('button')).to.be.true;
    expect(item.text()).to.equals('Update');
  });
  it('Expect to have a button to Cancel', () => {
    const wrapper = shallowMount(DataAsset, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-dataasset-button-cancel');
    expect(item.is('button')).to.be.true;
    expect(item.text()).to.equals('Cancel');
  });
  it('Expect to have a DHField component to display the Name', () => {
    const wrapper = shallowMount(DataAsset, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-dataasset-name');
    expect(item.is('dhfield-stub')).to.be.true;
    expect(item.attributes('value')).to.equals(DATAASSETS_MOCKDATA[0].name);
    expect(item.attributes('label')).to.equals('Name: ')
  });
  it('Expect to have a DHField component to display the Id', () => {
    const wrapper = shallowMount(DataAsset, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-dataasset-id');
    expect(item.is('dhfield-stub')).to.be.true;
    expect(item.attributes('value')).to.equals(DATAASSETS_MOCKDATA[0].id);
    expect(item.attributes('label')).to.equals('ID: ')
  });
  it('Expect to have a DHField component to display LastUpdate', () => {
    const wrapper = shallowMount(DataAsset, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-dataasset-lastupdate');
    expect(item.is('dhfield-stub')).to.be.true;
    expect(item.attributes('value')).to.equals(DATAASSETS_MOCKDATA[0].lastUpdate+'');
    expect(item.attributes('label')).to.equals('LastUpdate: ')
  });
  it('Expect to have a DHField component to display DHID', () => {
    const wrapper = shallowMount(DataAsset, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-dataasset-dhid');
    expect(item.is('dhfield-stub')).to.be.true;
    expect(item.attributes('value')).to.equals(DATAASSETS_MOCKDATA[0].dhId);
    expect(item.attributes('label')).to.equals('DHID: ')
  });
  it('Expect to have a DHField component to display DHSourceName', () => {
    const wrapper = shallowMount(DataAsset, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-dataasset-dhsourcename');
    expect(item.is('dhfield-stub')).to.be.true;
    expect(item.attributes('value')).to.equals(DATAASSETS_MOCKDATA[0].dhSourceName);
    expect(item.attributes('label')).to.equals('DHSourceName: ')
  });
  it('Expect to have a DHField component to display DHLastUpdate', () => {
    const wrapper = shallowMount(DataAsset, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-dataasset-dhlastupdate');
    expect(item.is('dhfield-stub')).to.be.true;
    expect(item.attributes('value')).to.equals(DATAASSETS_MOCKDATA[0].dhLastUpdate+'');
    expect(item.attributes('label')).to.equals('DHLastUpdate: ')
  });
  it('Expect to have a DHField component for the Projects lable', () => {
    const wrapper = shallowMount(DataAsset, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-dataasset-projects');
    expect(item.is('dhfield-stub')).to.be.true;
    expect(item.attributes('value')).to.equals('');
    expect(item.attributes('label')).to.equals('Projects')
  });
  it('Expect to list the projects with checkboxes', () => {
    const wrapper = shallowMount(DataAsset, {localVue, mocks: { $store, $route }});
    let items = wrapper.findAll('input');
    let inputCounter = 0;
    for(let i=0; i<items.length; i++) {
      if (items.at(i).attributes('id').includes('id-dataasset-project-') && items.at(i).attributes('type') == 'checkbox') {
        inputCounter++;
      } 
    }
    expect(inputCounter).to.equals(3);
  });
  it('Expect to list the data types with checkboxes', () => {
    const wrapper = shallowMount(DataAsset, {localVue, mocks: { $store, $route }});
    let items = wrapper.findAll('input');
    let inputCounter = 0;
    for(let i=0; i<items.length; i++) {
      if (items.at(i).attributes('id').includes('id-dataasset-datatype-') && items.at(i).attributes('type') == 'checkbox') {
        inputCounter++;
      } 
    }
    expect(inputCounter).to.equals(3);
  });


});
