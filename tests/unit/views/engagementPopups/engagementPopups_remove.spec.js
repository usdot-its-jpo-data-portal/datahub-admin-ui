import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import EngagementPopup from '@/views/engagementPopups/engagementPopups_remove.vue';
import ENGAGEMENT_POPUP_MOCKDATA from '@/testData/engagementPopups.json';

describe('engagementPopups_remove.vue', () =>{
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
      name: 'engagementPopups-remove'
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
  it('Expect to display a confirmation message to Remove', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('.cdh_message');
    expect(item.text().includes('Type the word "Delete"')).to.true;
  });
  it('Expect to have an input for the Confirmation', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-input-confirmation');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equals('text');
    expect(item.attributes('placeholder')).to.equals('Confirmation...')
  });
  it('Expect to have a button to Remove', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-button-remove');
    expect(item.is('button')).to.be.true;
    expect(item.text()).to.equals('Remove');
  });
  it('Expect to have a button to Cancel', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementpopup-button-cancel');
    expect(item.is('button')).to.be.true;
    expect(item.text()).to.equals('Cancel');
  });
  it('Expect to display a DHEngagementPopup component hiding the controls', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('dhengagementpopup-stub');
    expect(item.is('dhengagementpopup-stub')).to.be.true;
    expect(item.attributes('hidecontrols')).to.equals('true');
  });

});
