import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import DHField from '@/components/dh-field.vue';

describe('dh-field.vue', () =>{
  it('Expect Label', () => {
    const val = 'label';
    const wrapper = shallowMount(DHField, {propsData: { label: val }});
    let item = wrapper.find('.dh-field--label');
    expect(item.is('span')).to.be.true;
    expect(item.text()).to.equal(val);
  });
  it('Expect Value', () => {
    const val = 'value';
    const wrapper = shallowMount(DHField, {propsData: { value: val }});
    let item = wrapper.find('.dh-field--value');
    expect(item.is('span')).to.be.true;
    expect(item.text()).to.equal(val);
  });
  it('Expect Value time', () => {
    const val = new Date('2020-04-10 10:10:10');
    const wrapper = shallowMount(DHField, {propsData: { value: val, time: true }});
    let item = wrapper.find('.dh-field--value');
    expect(item.is('span')).to.be.true;
    expect(item.text()).to.contains('2020');
  });
  it('Expect Value size large', () => {
    const val = 'size';
    const wrapper = shallowMount(DHField, {propsData: { value: val, size:'large' }});
    let item = wrapper.find('.dh-field--value');
    expect(item.classes()).to.contains('dh-field--value-large');
  });
  it('Expect text weight to be bold', () => {
    const val = 'weight';
    const wrapper = shallowMount(DHField, {propsData: { value: val, weight:'bold' }});
    let item = wrapper.find('.dh-field--value');
    expect(item.classes()).to.contains('dh-field--value-bold');
  });
  it('Expect color to be red', () => {
    const val = 'color';
    const wrapper = shallowMount(DHField, {propsData: { value: val, color:'red' }});
    let item = wrapper.find('.dh-field--value');
    expect(item.classes()).to.contains('dh-field--value-red');
  });
  it('Expect to be a link', () => {
    const val = 'link';
    const wrapper = shallowMount(DHField, {propsData: { value: val, link:'true' }});
    let item = wrapper.find('.dh-field--value');
    let a = item.find('a');
    expect(a.html()).to.contains(`href="${val}"`);
  });
});
