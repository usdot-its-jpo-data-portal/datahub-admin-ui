import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import DHForbidden from '@/components/dh-forbidden.vue';

describe('dh-forbidden.vue', () =>{

  it('Expect to have Forbidden text', () => {
    const wrapper = shallowMount(DHForbidden, {attachTo: document.body});
    let txt = wrapper.find('.forbidden_text');
    expect(txt.text()).to.equal('Forbidden');
  });
  it('Expect to have lock icon with title Forbidden', () => {
    const wrapper = shallowMount(DHForbidden, {attachTo: document.body});
    console.log(wrapper.html());
    let item = wrapper.find('mdlock-stub');
    expect(item.attributes('title')).to.equal('Forbidden');
  });

});
