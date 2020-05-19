import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import DHEngagementPopup from '@/components/dh-engagementpopup.vue';

describe('dh-engagementpopup.vue', () =>{
  let data;
  beforeEach(() => {
    data = {
      id: 'ID',
      name: 'Name',
      description: 'Description',
      isActive: true,
      lastModified: new Date('2020-05-08 10:10:10'),
      content: '<h1>Testing...</h1>',
      controlsColor: 'black',
      controlsShadow: 'white'
    }
  });
  it('Expect to render Name', () => {
    const wrapper = shallowMount(DHEngagementPopup, {attachTo: document.body, propsData: { data: data }});
    let dhField = wrapper.find('#id-data-name');
    expect(dhField.is('dhfield-stub')).to.be.true;
    expect(dhField.attributes('value')).to.equal(data.name);
  });
  it('Expect to render isActive', () => {
    const wrapper = shallowMount(DHEngagementPopup, {attachTo: document.body, propsData: { data: data }});
    let dhField = wrapper.find('#id-data-isActive');
    expect(dhField.is('dhfield-stub')).to.be.true;
    expect(dhField.attributes('value')).to.equal(data.isActive+'');
  });
  it('Expect to have a link to Update', () => {
    const wrapper = shallowMount(DHEngagementPopup, {attachTo: document.body, propsData: { data: data }});
    let item = wrapper.find('#id-cb-update');
    expect(item.is('a')).to.be.true;
  });
  it('Expect to have a link to Remove', () => {
    const wrapper = shallowMount(DHEngagementPopup, {attachTo: document.body, propsData: { data: data }});
    let item = wrapper.find('#id-cb-remove');
    expect(item.is('a')).to.be.true;
  });
  it('Expect to have icon for the close control', () => {
    const wrapper = shallowMount(DHEngagementPopup, {attachTo: document.body, propsData: { data: data }});
    let item = wrapper.find('#id-control-close');
    expect(item.is('mdclose-stub')).to.be.true;
  });
  it('Expect to have a checkbox to not show the popup again', () => {
    const wrapper = shallowMount(DHEngagementPopup, {attachTo: document.body, propsData: { data: data }});
    let item = wrapper.find('#id-control-noshow');
    expect(item.is('input')).to.be.true;
    expect(item.attributes('type')).to.equal('checkbox');
  });
  it('Expect to have a text to let the user know to stop seeing the message', () => {
    const wrapper = shallowMount(DHEngagementPopup, {attachTo: document.body, propsData: { data: data }});
    let item = wrapper.find('#id-control-noshow-text');
    expect(item.is('span')).to.be.true;
    expect(item.text().includes('Click here if you would like to stop seeing this message')).to.be.true;
  });
  it('Expect to render description', () => {
    const wrapper = shallowMount(DHEngagementPopup, {attachTo: document.body, propsData: { data: data }});
    let item = wrapper.find('#id-data-description');
    expect(item.is('dhfield-stub')).to.be.true;
    expect(item.attributes('value')).to.equal(data.description);
  });
  it('Expect to render lastModified', () => {
    const wrapper = shallowMount(DHEngagementPopup, {attachTo: document.body, propsData: { data: data }});
    let item = wrapper.find('#id-data-lastModified');
    expect(item.is('dhfield-stub')).to.be.true;
    expect(item.attributes('value').includes('2020')).to.be.true;
  });
  it('Expect to render color', () => {
    const wrapper = shallowMount(DHEngagementPopup, {attachTo: document.body, propsData: { data: data }});
    let item = wrapper.find('#id-data-color');
    expect(item.is('dhfield-stub')).to.be.true;
    expect(item.attributes('value')).to.equal(data.controlsColor);
  });
  it('Expect to render shadow', () => {
    const wrapper = shallowMount(DHEngagementPopup, {attachTo: document.body, propsData: { data: data }});
    let item = wrapper.find('#id-data-shadow');
    expect(item.is('dhfield-stub')).to.be.true;
    expect(item.attributes('value')).to.equal(data.controlsShadow);
  });
});
