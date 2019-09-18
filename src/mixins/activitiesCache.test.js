import { mount } from '@vue/test-utils';
import { activitiesCache } from './activitiesCache';

describe('selected', () => {
  const wrapper = mount({
    mixins: [activitiesCache],
    render() {}
  });
  wrapper.vm.selectionChange([8, 0, 2, 20]);

  it('should be an array', () => {
    expect(Array.isArray(wrapper.vm.selected)).toBe(true);
  });
  it('should contain added elements', () => {
    expect(wrapper.vm.selected).toEqual(expect.arrayContaining([8, 20]));
  });
  it('should exclude removed elements and add new ones at the end', () => {
    wrapper.vm.selected = [8, 2, 5, 7];
    // 5 removed and 4 added
    wrapper.vm.selectionChange([2, 4, 8, 7]);
    expect(wrapper.vm.selected).toEqual([8, 2, 7, 4]);
  });
});