import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import EngagementPopup from '@/views/engagementPopups/engagementPopups_update.vue';
import ENGAGEMENT_POPUP_MOCKDATA from '@/testData/engagementPopups.json';

describe('engagementPopups_update.vue', () =>{
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
        selectedEngagementPopup: ENGAGEMENT_POPUP_MOCKDATA[0]
      },
      commit: function(a,b) {}, // eslint-disable-line
      dispatch: function(a) {} // eslint-disable-line
    };
    $route = {
      name: 'engagementPopups-update'
    };
  });
  it('Expect to display a message in case of error', () => {
    $store.state.processing_error = true;
    $store.state.processing_message = 'Error message'
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-error-message');
    expect(item.is('span')).to.be.true;
    expect(item.text()).to.equals($store.state.processing_message);
  });
  it('Expect to display a message while processing', async () => {
    $store.state.is_processing = true;
    let msg = 'Processing...';
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    wrapper.setData({message: msg});
    await wrapper.vm.$nextTick();
    let item = wrapper.find('#id-engagementPopup-processing-message');
    expect(item.is('span')).to.be.true;
    expect(item.text()).to.equals(msg);
  });
  it('Expect to display a confirmation message to Update', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('.cdh_message');
    expect(item.text().includes('Type the word "Update"')).to.true;
  });
  it('Expect to have an input for the Confirmation', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-input-confirmation');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equals('text')
    expect(item.attributes('placeholder')).to.equals('Confirmation...')
  });
  it('Expect to have a button to Update', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-button-update');
    expect(item.is('button')).to.be.true;
    expect(item.text()).to.equals('Update');
  });
  it('Expect to have a button to Cancel', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementpopup-button-cancel');
    expect(item.is('button')).to.be.true;
    expect(item.text()).to.equals('Cancel');
  });
  it('Expect to display a DHField component for the ID', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-id');
    expect(item.is('dhfield-stub')).to.be.true;
    expect(item.attributes('value')).to.equals(ENGAGEMENT_POPUP_MOCKDATA[0].id);
  });
  it('Expect to display checkbox input for isActive', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-isActive');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equals('checkbox');
    expect(wrapper.vm.$refs.refIsActive.checked).to.equals(ENGAGEMENT_POPUP_MOCKDATA[0].isActive);
  });
  it('Expect to display label for the checkbox', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-isActive-label');
    expect(item.is('span')).to.be.true;
    expect(item.text()).to.equals('Is Active');
  });
  it('Expect to have a label for the Name', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-name-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equals('Name');
  });
  it('Expect to have an input for the Name', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-name');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equals('text');
    expect(item.attributes('placeholder')).to.equals('Name...');
    expect(wrapper.vm.$refs.refName.value).to.equals(ENGAGEMENT_POPUP_MOCKDATA[0].name);
  });
  it('Expect to have a label for Description', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-description-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equals('Description');
  });
  it('Expect to have TextArea for the description', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-description');
    expect(item.is('textarea')).to.be.true;
    expect(wrapper.vm.$refs.refDescription.value).to.equals(ENGAGEMENT_POPUP_MOCKDATA[0].description);
  });
  it('Expect to have a label for Source code', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-content-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equals('Source code');
  });
  it('Expect to have TextArea for the Source code', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-content');
    expect(item.is('textarea')).to.be.true;
    expect(wrapper.vm.$refs.refContent.value).to.equals(ENGAGEMENT_POPUP_MOCKDATA[0].content);
  });
  it('Expect to have a label for Controls Color', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-controls-color-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equals('Controls font color:');
  });
  it('Expect to have a Current control color sample', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-controls-color-current');
    expect(item.is('span')).to.be.true;
    expect(item.attributes('style')).to.equals('background-color: '+ENGAGEMENT_POPUP_MOCKDATA[0].controlsColor+';');
  });
  it('Expect to have a Select for Controls Color', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-controls-color');
    expect(item.is('select')).to.be.true;
  });
  it('Expect to have a label for Controls Shadow', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-controls-shadow-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equals('Controls font shadow:');
  });
  it('Expect to have a Current control shadow sample', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-controls-shadow-current');
    expect(item.is('span')).to.be.true;
    expect(item.attributes('style')).to.equals('background-color: '+ENGAGEMENT_POPUP_MOCKDATA[0].controlsShadow+';');
  });
  it('Expect to have a Select for Controls Shadow', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-controls-shadow');
    expect(item.is('select')).to.be.true;
  });
  it('Expect to have a label for the Preview', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-preview-label');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equal('Preview');
  });
});
