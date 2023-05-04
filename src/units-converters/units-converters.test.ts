import { rem, em, px } from './units-converters';

describe('units-converters/rem', () => {
  it('converts numbers to rem', () => {
    expect(rem(0)).toBe('0rem');
    expect(rem(16)).toBe('1rem');
    expect(rem(-32)).toBe('-2rem');
  });

  it('converts string px to rems', () => {
    expect(rem('32px')).toBe('2rem');
  });

  it('does not modify other values', () => {
    expect(rem('2rem')).toBe('2rem');
    expect(rem('10%')).toBe('10%');
    expect(rem('5vh')).toBe('5vh');
  });
});

describe('units-converters/em', () => {
  it('converts numbers to em', () => {
    expect(em(0)).toBe('0em');
    expect(em(16)).toBe('1em');
    expect(em(-32)).toBe('-2em');
  });

  it('converts string px to ems', () => {
    expect(em('32px')).toBe('2em');
  });

  it('does not modify other values', () => {
    expect(em('2em')).toBe('2em');
    expect(em('10%')).toBe('10%');
    expect(em('5vh')).toBe('5vh');
  });
});

describe('units-converters/px', () => {
  it('converts rem string to px number', () => {
    expect(px('1rem')).toBe(16);
    expect(px('1.25rem')).toBe(20);
  });

  it('converts em string to px number', () => {
    expect(px('1em')).toBe(16);
    expect(px('1.25em')).toBe(20);
  });

  it('converts px string to px number', () => {
    expect(px('12px')).toBe(12);
  });

  it('returns number if function received number as an argument', () => {
    expect(px(16)).toBe(16);
    expect(px('16')).toBe(16);
  });

  it('returns NaN if value cannot be parsed', () => {
    expect(px('12p')).toBe(NaN);
    expect(px('12re')).toBe(NaN);
    expect(px('12%')).toBe(NaN);
    expect(px('12vh')).toBe(NaN);
    expect(px({})).toBe(NaN);
    expect(px([])).toBe(NaN);
    expect(px(null)).toBe(NaN);
    expect(px(undefined)).toBe(NaN);
  });
});
