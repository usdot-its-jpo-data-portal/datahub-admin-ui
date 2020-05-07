import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import EngagementPopup from '@/views/engagementPopups/engagementPopups_home.vue';
import ENGAGEMENT_POPUP_MOCKDATA from '@/testData/engagementPopups.json';

describe('engagementPopups_home.vue', () =>{
  let $store;
  let $route;
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    $store = {
      state: {
        engagementPopupFilter: '',
        engagementPopups: ENGAGEMENT_POPUP_MOCKDATA,
        forbidden: false,
        is_processing: false,
        processing_id: '',
        processing_message: '',
        processing_error: false
      },
      commit: function(a,b) {}, // eslint-disable-line
      dispatch: function(a) {} // eslint-disable-line
    };
    $route = {
      name: 'engagementPopups-home'
    };
  });
  it('Expect to display a list of DHEngagementPopup', () => {
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let items = wrapper.findAll('dhengagementpopup-stub');
    expect(items.length).to.equals(3);
  });
  it('Expect to display Forbidden component', () => {
    $store.state.forbidden = true;
    const wrapper = shallowMount(EngagementPopup, {localVue, mocks: { $store, $route }});
    let items = wrapper.find('dhforbidden-stub');
    expect(items.is('dhforbidden-stub')).to.be.true;
  });

});
