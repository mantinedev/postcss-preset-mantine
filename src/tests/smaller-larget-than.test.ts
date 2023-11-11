import { testTransform } from './utils';

const smallerThanInput = `
.a {
  @mixin smaller-than 320px {
    background: red;
  }
}
`;

const largerThanInput = `
.a {
  @mixin larger-than 320px {
    background: red;
  }
}
`;

describe('smaller-than', () => {
  it('it transforms smaller-than mixin correctly', async () => {
    const res = await testTransform(smallerThanInput);
    expect(res.css).toMatchSnapshot();
  });
});

describe('larger-than', () => {
  it('it transforms larger-than mixin correctly', async () => {
    const res = await testTransform(largerThanInput);
    expect(res.css).toMatchSnapshot();
  });
});
