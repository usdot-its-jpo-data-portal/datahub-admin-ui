import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Projects from '@/views/projects.vue';

describe('projects.vue', () =>{
  let $store;
  let $route;
  let localVue;
  beforeEach(() => {
    localVue = createLocalVue();
    $store = {
      state: {
        numberOfProjects: '123',
        forbidden: false,
        projects: [],
        projectsFilter: ''
      }
    };
    $route = {
      name: 'projects-home'
    };
  });
  it('Expect to have button to Refresh', () => {
    const wrapper = shallowMount(Projects, {localVue, mocks: { $store, $route }});
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
  it('Expect to have button to Add', () => {
    const wrapper = shallowMount(Projects, {localVue, mocks: { $store, $route }});
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
  it('Expect to have input to filter projects', () => {
    const wrapper = shallowMount(Projects, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-projects-search');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equals('search');
  });
  it('Expect to have a label to show the number of Projects', () => {
    const wrapper = shallowMount(Projects, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('#id-number-projects');
    expect(item.is('label')).to.be.true;
    expect(item.text()).to.equals(`Projects: ${$store.state.numberOfProjects}`);
  });
  it('Expect to have router-view with name projects', () => {
    const wrapper = shallowMount(Projects, {localVue, mocks: { $store, $route }});
    let item = wrapper.find('router-view');
    expect(item.exists()).to.be.true;
    expect(item.attributes('name')).to.equals('projects');
  });

});
