import { getDarkValue, getLightValue } from './get-value';

describe('light-dark', () => {
  it('returns correct light value', () => {
    expect(getLightValue('light-dark(red, blue)')).toBe('red');
    expect(getLightValue('1rem solid light-dark(red, blue)')).toBe('1rem solid red');
  });

  it('returns correct dark value', () => {
    expect(getDarkValue('light-dark(red, blue)')).toBe('blue');
    expect(getDarkValue('1rem solid light-dark(red, blue)')).toBe('1rem solid blue');
  });
});
