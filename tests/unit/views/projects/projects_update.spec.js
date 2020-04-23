import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Project from '@/views/projects/projects_update.vue';
import PROJECTS_MOCKDATA from '@/testData/projects.json';

describe('projects_update.vue', () =>{
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
        selectedProject: PROJECTS_MOCKDATA[0]
      },
      commit: function(a,b) {}, // eslint-disable-line
      dispatch: function(a) {} // eslint-disable-line
    };
    $route = {
      name: 'projects-update'
    };
  });
  it('Expect to display a message in case of error', () => {
    $store.state.processing_error = true;
    $store.state.processing_message = 'Error message'
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
  it('Expect to display a confirmation message to Update', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('.cdh_message');
    expect(item.text().includes('Type the word "Update"')).to.true;
  });
  it('Expect to have an input for the Confirmation', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-project-input-confirmation');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equals('text')
    expect(item.attributes('placeholder')).to.equals('Confirmation...')
  });
  it('Expect to have a button to Update', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-project-button-update');
    expect(item.is('button')).to.be.true;
    expect(item.text()).to.equals('Update');
  });
  it('Expect to have a button to Cancel', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-project-button-cancel');
    expect(item.is('button')).to.be.true;
    expect(item.text()).to.equals('Cancel');
  });
  it('Expect to display a DHField component for the ID', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-project-id');
    expect(item.is('dhfield-stub')).to.be.true;
    expect(item.attributes('value')).to.equals(PROJECTS_MOCKDATA[0].id);
  });
  it('Expect to display checkbox input for the Enabled', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-project-enabled');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equals('checkbox');
    expect(wrapper.vm.$refs.refEnabled.checked).to.equals(PROJECTS_MOCKDATA[0].isEnabled);
  });
  it('Expect to display label for the checkbox', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-project-enabled-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equals('Enabled');
  });
  it('Expect to have an input for the Name', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-project-name');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equals('text');
    expect(item.attributes('placeholder')).to.equals('Project name...');
    expect(wrapper.vm.$refs.refName.value).to.equals(PROJECTS_MOCKDATA[0].name);
  });
  it('Expect to have TextArea for the description', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-project-description');
    expect(item.is('textarea')).to.be.true;
    expect(wrapper.vm.$refs.refDescription.value).to.equals(PROJECTS_MOCKDATA[0].description);
  });
});
