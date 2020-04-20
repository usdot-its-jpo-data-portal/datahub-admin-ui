import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Project from '@/views/projects/projects_home.vue';
import PROJECTS_MOCKDATA from '@/testData/projects.json';

describe('projects_home.vue', () =>{
  let $store;
  let $route;
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    $store = {
      state: {
        projectsFilter: '',
        projects: PROJECTS_MOCKDATA,
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
      name: 'projects-home'
    };
  });
  it('Expect to display a list of DHProject', () => {
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let items = wrapper.findAll('dhproject-stub');
    expect(items.length).to.equals(3);
  });
  it('Expect to display Forbidden component', () => {
    $store.state.forbidden = true;
    const wrapper = shallowMount(Project, {localVue, mocks: { $store, $route }});
    let items = wrapper.find('dhforbidden-stub');
    expect(items.is('dhforbidden-stub')).to.be.true;
  });

});
