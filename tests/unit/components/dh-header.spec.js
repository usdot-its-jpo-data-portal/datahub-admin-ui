import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import DHDataAsset from '@/components/dh-header.vue';

describe('dh-header.vue', () =>{
  let $store;
  let localVue;
  let router;
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
    router = new VueRouter();
    $store = {
      state: {
        auth_token: '123',
        version: '1.0.0'
      }
    }
  });
  it('Expect to have Title', () => {
    const wrapper = shallowMount(DHDataAsset, {localVue, router, mocks: { $store }});
    let item = wrapper.find('.dh-header-nav_text-title');
    expect(item.text()).to.equal('DataHub Admin UI')
  });
  it('Expect to have Version', () => {
    const wrapper = shallowMount(DHDataAsset, {localVue, router, mocks: { $store }});
    let item = wrapper.find('.dh-header-nav_text-version');
    expect(item.text()).to.equal(`Version: ${$store.state.version}`)
  });
  it('Expect to have a button to close the floating menu', () => {
    const wrapper = shallowMount(DHDataAsset, {localVue, router, mocks: { $store }});
    let item = wrapper.find('.usa-nav__close');
    expect(item.is('button')).to.be.true;
  });
  it('Expect to have a link to Data Assets', () => {
    const wrapper = shallowMount(DHDataAsset, {localVue, router, mocks: { $store }});
    let routerLinks = wrapper.findAll('router-link-stub');
    let found = false;
    for(let i=0; i<routerLinks.length; i++) {
      if (routerLinks.at(i).text() == "Data Assets") {
        found = true;
        break;
      }
    }
    expect(found).to.be.true;
  });
  it('Expect to have a link to Projects', () => {
    const wrapper = shallowMount(DHDataAsset, {localVue, router, mocks: { $store }});
    let routerLinks = wrapper.findAll('router-link-stub');
    let found = false;
    for(let i=0; i<routerLinks.length; i++) {
      if (routerLinks.at(i).text() == "Projects") {
        found = true;
        break;
      }
    }
    expect(found).to.be.true;
  });
  it('Expect to have input for the token', () => {
    const wrapper = shallowMount(DHDataAsset, {localVue, router, mocks: { $store }});
    let item = wrapper.find('#id-authorization-token');
    console.log(item.html());
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equal('password');
  });
  it('Expect to have a button to open the floating menu', () => {
    const wrapper = shallowMount(DHDataAsset, {localVue, router, mocks: { $store }});
    let item = wrapper.find('.usa-menu-btn');
    expect(item.is('button')).to.be.true;
    expect(item.text()).to.equals('Menu');
  });
});
