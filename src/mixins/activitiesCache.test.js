import { mount } from '@vue/test-utils';
import { activitiesCache } from './activitiesCache';

let wrapper = mount({ mixins: [activitiesCache], render() {}});

describe('selected', () => {
  it('should be an array', () => {
    expect(Array.isArray(wrapper.vm.selected)).toBe(true);
  });
  it('should contain added elements', () => {
    wrapper.vm.selected = [];
    wrapper.vm.selectionChange([8, 0, 2, 20]);
    expect(wrapper.vm.selected).toEqual(expect.arrayContaining([8, 20]));
  });
  it('should exclude removed elements and add new ones at the end', () => {
    wrapper.vm.selected = [8, 2, 5, 7];
    wrapper.vm.selectionChange([2, 4, 8, 7]);
    expect(wrapper.vm.selected).toEqual([8, 2, 7, 4]);
  });
});

describe('colors', () => {
  beforeEach(() => {
    wrapper.vm.selected = [];
    clearColors();
  });
  it('should bind a color on selection change - itens added', () => {
    wrapper.vm.selectionChange([1, 2]);
    expect(wrapper.vm.colors[0].id).toBe(1);
    expect(wrapper.vm.colors[1].id).toBe(2);
    expect(wrapper.vm.colors[2].id).toBeNull();
  });
  it('should bind a color on selection change - itens removed', () => {
    wrapper.vm.selectionChange([1, 2, 3]);
    wrapper.vm.selectionChange([3, 1]);
    expect(wrapper.vm.colors[0].id).toBe(1);
    expect(wrapper.vm.colors[1].id).toBeNull();
    expect(wrapper.vm.colors[2].id).toBe(3);
  });
});

function clearColors() {
  wrapper.vm.colors.forEach(element => {
    element.id = null;
  });
}