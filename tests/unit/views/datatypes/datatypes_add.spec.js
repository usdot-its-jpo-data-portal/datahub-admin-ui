import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import DataTypes from '@/views/datatypes/datatypes_add.vue';

describe('datatypes_add.vue', () =>{
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
        processing_error: false
      },
      commit: function(a,b) {}, // eslint-disable-line
      dispatch: function(a) {} // eslint-disable-line
    };
    $route = {
      name: 'datatypes-add'
    };
  });
  it('Expect to display a confirmation message to Add', () => {
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('.cdh_message');
    expect(item.text().includes('Type the word "Add"')).to.true;
  });
  it('Expect to have a text input for Confirmation', () => {
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let items = wrapper.findAll('input');
    let found = false;
    for(let i=0; i<items.length; i++) {
      if (items.at(i).attributes('placeholder') == 'Confirmation...') {
        found = true;
        break;
      }
    }
    expect(found).to.be.true;
  });
  it('Expect to have a button to Add', () => {
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
  it('Expect to have a checkbox input for Enabled', () => {
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-datatype-enabled');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equal('checkbox');
  });
  it('Expect to have a label for the Enabled checkbox', () => {
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-datatype-enabled-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equal('Enabled');
  });
  it('Expect to have a label for the Name input', () => {
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-datatype-name-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equal('Name');
  });
  it('Expect to have an input for the Name', () => {
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-datatype-name');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equal('text');
    expect(item.attributes('placeholder')).to.equal('Data Type name...');
  });
  it('Expect to have a label for the Description', () => {
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-datatype-description-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equal('Description');
  });
  it('Expect to have a TextArea for the Description', () => {
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-datatype-description');
    expect(item.is('textarea')).to.be.true;
  });
  it('Expect to display a message in case of error', () => {
    $store.state.processing_error = true;
    $store.state.processing_message = 'Error message';
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    let items = wrapper.findAll('span');
    let found = false;
    for(let i=0; i<items.length; i++) {
      if (items.at(i).text() == $store.state.processing_message) {
        found = true;
        break;
      }
    }
    expect(found).to.be.true;
  });
  it('Expect to display a message while processing', async () => {
    $store.state.is_processing = true;
    let msg = 'Processing';
    const wrapper = shallowMount(DataTypes, {localVue, mocks: { $store, $route }});
    wrapper.setData({message: msg})
    await wrapper.vm.$nextTick();
    let items = wrapper.findAll('span');
    let found = false;
    for(let i=0; i<items.length; i++) {
      if (items.at(i).text() == wrapper.vm.$data.message) {
        found = true;
        break;
      }
    }
    expect(found).to.be.true;
  });
});
