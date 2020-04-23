import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Project from '@/views/projects/projects_add.vue';

describe('projects_add.vue', () =>{
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
      name: 'projects-add'
    };
  });
  it('Expect to display a message in case of error', () => {
    $store.state.processing_error = true;
    $store.state.processing_message = 'Error message';
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-project-error-message');
    expect(item.is('span')).to.be.true;
    expect(item.text()).to.equals($store.state.processing_message);
  });
  it('Expect to display a message while processing', async () => {
    $store.state.is_processing = true;
    let msg = 'Processing...';
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    wrapper.setData({message: msg});
    await wrapper.vm.$nextTick();
    let item = wrapper.find('#id-project-processing-message');
    expect(item.is('span')).to.be.true;
    expect(item.text()).to.equals(msg);
  });
  it('Expect to display confirmation message', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('.cdh_message');
    expect(item.text().includes('Type the word "Add"')).to.be.true;
  });
  it('Expect input text for the confirmation', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-project-input-confirmation');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equals('text');
    expect(item.attributes('placeholder')).to.equals('Confirmation...');
  });
  it('Expect button to Add', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-project-button-add');
    expect(item.is('button')).to.be.true;
    expect(item.text()).to.equals('Add');
  });
  it('Expect button to Cancel', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-project-button-cancel');
    expect(item.is('button')).to.be.true;
    expect(item.text()).to.equals('Cancel');
  });
  it('Expect to have input checkbox for the Enabled', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-project-enabled');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equals('checkbox');
  });
  it('Expect to have a label for the Enabled input', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-project-enabled-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equals('Enabled');
  });
  it('Expect to have a label for the Name', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-project-name-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equals('Name');
  });
  it('Expect to have an input text for the Name', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-project-name');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equals('text');
    expect(item.attributes('placeholder')).to.equals('Project name...');
  });
  it('Expect to have a label for the Description', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-project-description-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equals('Description');
  });
  it('Expect to have TextArea for the description', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-project-description');
    expect(item.is('textarea')).to.be.true;
  });

});
