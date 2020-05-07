import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import EngagementPopups from '@/views/engagementPopups/engagementPopups_add.vue';

describe('engagementPopups_add.vue', () =>{
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
      name: 'engagementPopups-add'
    };
  });
  it('Expect to display a message in case of error', () => {
    $store.state.processing_error = true;
    $store.state.processing_message = 'Error message';
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-error-message');
    expect(item.is('span')).to.be.true;
    expect(item.text()).to.equals($store.state.processing_message);
  });
  it('Expect to display a message while processing', async () => {
    $store.state.is_processing = true;
    let msg = 'Processing...';
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    wrapper.setData({message: msg});
    await wrapper.vm.$nextTick();
    let item = wrapper.find('#id-engagementPopup-processing-message');
    expect(item.is('span')).to.be.true;
    expect(item.text()).to.equals(msg);
  });
  it('Expect to display confirmation message', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('.cdh_message');
    expect(item.text().includes('Type the word "Add"')).to.be.true;
  });
  it('Expect input text for the confirmation', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-input-confirmation');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equals('text');
    expect(item.attributes('placeholder')).to.equals('Confirmation...');
  });
  it('Expect button to Add', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-button-add');
    expect(item.is('button')).to.be.true;
    expect(item.text()).to.equals('Add');
  });
  it('Expect button to Cancel', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-button-cancel');
    expect(item.is('button')).to.be.true;
    expect(item.text()).to.equals('Cancel');
  });
  it('Expect to have a label for Name', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-input-name-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equals('Name');
  });
  it('Expect to have an input for Name', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-input-name');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equals('text');
    expect(item.attributes('placeholder')).to.equals('Name...');
  });
  it('Expect to have a label for Description', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-input-description-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equals('Description');
  });
  it('Expect to have a text area for description', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-input-description');
    expect(item.is('textarea')).to.be.true;
    expect(item.attributes('placeholder')).to.equals('Description...');
  });
  it('Expect to have a label for Source code', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-content-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equals('Source code');
  });
  it('Expect to have a text area for source code', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-content');
    expect(item.is('textarea')).to.be.true;
  });
  it('Expect to have a label for Controls font color', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-controls-color-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equals('Controls font color:');
  });
  it('Expect to have a select control for the colors', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-controls-color');
    expect(item.is('select')).to.be.true;
  });
  it('Expect to have a label for Shadow color', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-controls-shadow-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equals('Controls font shadow:');
  });
  it('Expect to have a select control for the shadow color', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-controls-shadow');
    expect(item.is('select')).to.be.true;
  });
  it('Expect to have a label for Preview', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-preview-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equals('Preview');
  });
  it('Expect to have a control for closing the popup', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-controls-close');
    expect(item.is('span')).to.be.true;
    let classes = item.attributes('class');
    expect(classes.includes('dh-engpop-color-black')).to.be.true;
    expect(classes.includes('dh-engpop-shadow-white')).to.be.true;
  });
  it('Expect to have a checkbox to not show the popup again', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-controls-noshow');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equal('checkbox');
  });
  it('Expect to have a text to let the user know to stop seeing the message', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-controls-noshow-text');
    expect(item.is('span')).to.be.true;
    let classes = item.attributes('class');
    expect(classes.includes('dh-engpop-color-black')).to.be.true;
    expect(classes.includes('dh-engpop-shadow-white')).to.be.true;
    expect(item.text().includes('Click here if you would like to stop seeing this message')).to.be.true;
  });
});
