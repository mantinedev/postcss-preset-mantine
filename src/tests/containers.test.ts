import { testTransform } from './utils';

const rem = `
.card {
  @container (min-width: rem(32px)) {
    background: red;
  }
}
`;

const em = `
.card {
  @container (min-width: em(32px)) {
    background: red;
  }
}
`;

describe('@container', () => {
  it('transforms rem', async () => {
    const res = await testTransform(rem);
    expect(res.css).toMatchSnapshot();
  });

  it('transforms em', async () => {
    const res = await testTransform(em);
    expect(res.css).toMatchSnapshot();
  });
});
