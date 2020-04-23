import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import DataTypes from '@/views/datatypes.vue';

describe('datatypes.vue', () =>{
  let $store;
  let $route;
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    $store = {
      state: {
        numberOfDataTypes: '123',
        forbidden: false,
        dataTypes: [],
        dataTypesFilter: ''
      }
    };
    $route = {
      name: 'datatypes-home'
    };
  });
  it('Expect to have button to Refresh', () => {
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let items = wrapper.findAll('button');
    let found = false;
    for(let i=0; i<items.length; i++) {
      if (items.at(i).text() == 'Refresh') {
        found = true;
        break;
      }
    }
    expect(found).to.be.true;
  });
  it('Expect to have button to Add', () => {
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let items = wrapper.findAll('button');
    let found = false;
    for(let i=0; i<items.length; i++) {
      if (items.at(i).text() == 'Add') {
        found = true;
        break;
      }
    }
    expect(found).to.be.true;
  });
  it('Expect to have input to filter data types', () => {
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-datatypes-search');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equals('search');
  });
  it('Expect to have a label to show the number of Data Types', () => {
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-number-datatypes');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equals(`Data Types: ${$store.state.numberOfDataTypes}`);
  });
  it('Expect to have router-view with name datatypes', () => {
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('router-view');
    expect(item.exists()).to.be.true;
    expect(item.attributes('name')).to.equals('datatypes');
  });

});
