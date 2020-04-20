import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import DHDataType from '@/components/dh-dataType.vue';

describe('dh-dataType.vue', () =>{
  let data;
  beforeEach(() => {
    data = {
      id: 'ID',
      name: 'Name',
      description: 'Description',
      isEnabled: true,
      lastModified: new Date('2020-04-10 10:10:10')
    }
  });
  it('Expect to render ID value', () => {
    const wrapper = shallowMount(DHDataType, {attachTo: document.body, propsData: { data: data }});
    let dhFields = wrapper.findAll('dhfield-stub');
    let found = false;
    for(let i=0; i<dhFields.length; i++) {
      if (data.id == dhFields.at(i).attributes('value')) {
        found = true;
        break;
      }
    }
    expect(found).to.be.true;
  });
  it('Expect to render Name value', () => {
    const wrapper = shallowMount(DHDataType, {attachTo: document.body, propsData: { data: data }});
    let dhFields = wrapper.findAll('dhfield-stub');
    let found = false;
    for(let i=0; i<dhFields.length; i++) {
      if (data.name == dhFields.at(i).attributes('value')) {
        found = true;
        break;
      }
    }
    expect(found).to.be.true;
  });
  it('Expect to render Description value', () => {
    const wrapper = shallowMount(DHDataType, {attachTo: document.body, propsData: { data: data }});
    let dhFields = wrapper.findAll('dhfield-stub');
    let found = false;
    for(let i=0; i<dhFields.length; i++) {
      if (data.description == dhFields.at(i).attributes('value')) {
        found = true;
        break;
      }
    }
    expect(found).to.be.true;
  });
  it('Expect to render isEnabled value', () => {
    const wrapper = shallowMount(DHDataType, {attachTo: document.body, propsData: { data: data }});
    let dhFields = wrapper.findAll('dhfield-stub');
    let found = false;
    for(let i=0; i<dhFields.length; i++) {
      if ((data.isEnabled+'') == dhFields.at(i).attributes('value')) {
        found = true;
        break;
      }
    }
    expect(found).to.be.true;
  });
  it('Expect to render lastModified value', () => {
    const wrapper = shallowMount(DHDataType, {attachTo: document.body, propsData: { data: data }});
    let dhFields = wrapper.findAll('dhfield-stub');
    let found = false;
    for(let i=0; i<dhFields.length; i++) {
      if (dhFields.at(i).attributes('value').includes('2020')) {
        found = true;
        break;
      }
    }
    expect(found).to.be.true;
  });

});
