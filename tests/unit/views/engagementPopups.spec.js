import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import EngagementPopups from '@/views/engagementPopups.vue';

describe('engagementPopups.vue', () =>{
  let $store;
  let $route;
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    $store = {
      state: {
        numberOfEngagementPopups: '123',
        forbidden: false,
        engagementPopups: [],
        engagementPopupFilter: ''
      }
    };
    $route = {
      name: 'engagementPopups-home'
    };
  });
  it('Expect to have button to Refresh', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-refresh');
    expect(item.is('button')).to.be.true;
    expect(item.text()).to.equal('Refresh');
  });
  it('Expect to have button to Add', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-add');
    expect(item.is('button')).to.be.true;
    expect(item.text()).to.equal('Add');
  });
  it('Expect to have input to filter engagement popups', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-engagementPopup-filter');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equal('search');
  });
  it('Expect to have a label to show the number of Engagement Popups', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-number-engagementPopups');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equals(`Engagement Popups: ${$store.state.numberOfEngagementPopups}`);
  });
  it('Expect to have router-view with name engagementPopups', () => {
    const wrapper = shallowMount(EngagementPopups, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('router-view');
    expect(item.exists()).to.be.true;
    expect(item.attributes('name')).to.equals('engagementPopups');
  });

});
