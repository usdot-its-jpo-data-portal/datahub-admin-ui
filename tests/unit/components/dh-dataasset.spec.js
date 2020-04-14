import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import DHDataAsset from '@/components/dh-dataAsset.vue';

describe('dh-dataAsset.vue', () =>{
  let data;
  beforeEach(() => {
    data = {
      name: 'Name',
      id: 'ID',
      lastUpdate: new Date('2019-04-10 10:10:10'),
      dhId: 'DHID',
      dhSourceName: 'SourceName',
      dhLastUpdate: new Date('2020-04-10 10:10:10'),
      dhProjects: [
        {name: 'project-1'},
        {name: 'project-2'}
      ]
    }
  });
  it('Expect to have Name', () => {
    const wrapper = shallowMount(DHDataAsset, {attachTo: document.body, propsData: { data: data }});
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
  it('Expect to have ID', () => {
    const wrapper = shallowMount(DHDataAsset, {attachTo: document.body, propsData: { data: data }});
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
  it('Expect to have lastUpdate', () => {
    const wrapper = shallowMount(DHDataAsset, {attachTo: document.body, propsData: { data: data }});
    let dhFields = wrapper.findAll('dhfield-stub');
    let found = false;
    for(let i=0; i<dhFields.length; i++) {
      if (dhFields.at(i).attributes('value').includes('2019')) {
        found = true;
        break;
      }
    }
    expect(found).to.be.true;
  });
  it('Expect to have dhId', () => {
    const wrapper = shallowMount(DHDataAsset, {attachTo: document.body, propsData: { data: data }});
    let dhFields = wrapper.findAll('dhfield-stub');
    let found = false;
    for(let i=0; i<dhFields.length; i++) {
      if (data.dhId == dhFields.at(i).attributes('value')) {
        found = true;
        break;
      }
    }
    expect(found).to.be.true;
  });
  it('Expect to have dhSourceName', () => {
    const wrapper = shallowMount(DHDataAsset, {attachTo: document.body, propsData: { data: data }});
    let dhFields = wrapper.findAll('dhfield-stub');
    let found = false;
    for(let i=0; i<dhFields.length; i++) {
      if (data.dhSourceName == dhFields.at(i).attributes('value')) {
        found = true;
        break;
      }
    }
    expect(found).to.be.true;
  });
  it('Expect to have dhLastUpdate', () => {
    const wrapper = shallowMount(DHDataAsset, {attachTo: document.body, propsData: { data: data }});
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
  it('Expect to have dhProjects', () => {
    const wrapper = shallowMount(DHDataAsset, {attachTo: document.body, propsData: { data: data }});
    let dhFields = wrapper.findAll('dhfield-stub');
    let found = false;
    for(let i=0; i<dhFields.length; i++) {
      if (data.dhProjects[0].name == dhFields.at(i).attributes('value')) {
        found = true;
        break;
      }
    }
    expect(found).to.be.true;
  });
});
