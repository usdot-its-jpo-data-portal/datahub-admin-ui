import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import DataAssets from '@/views/dataassets.vue';

describe('DataAssets.vue', () =>{
  let $store;
  let $route;
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    $store = {
      state: {
        numberOfDataAssets: '123',
        forbidden: false,
        dataAssetsFilter: ''
      }
    };
    $route = {
      name: 'dataassets-home'
    };
  });
  it('Expect to have button to Refresh', () => {
    const wrapper = shallowMount(DataAssets, {localVue, mocks: { $store, $route }});
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
  it('Expect to have input to filter Data Assets', () => {
    const wrapper = shallowMount(DataAssets, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-dataassets-search');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equals('search');
  });
  it('Expect to have a label to show the number of Data Assets', () => {
    const wrapper = shallowMount(DataAssets, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-number-dataAssets');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equals(`Data Assets: ${$store.state.numberOfDataAssets}`);
  });
  it('Expect to have router-view with name dataassets', () => {
    const wrapper = shallowMount(DataAssets, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('router-view');
    expect(item.exists()).to.be.true;
    expect(item.attributes('name')).to.equals('dataassets');
  });

});
