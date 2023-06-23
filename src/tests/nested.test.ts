import { testTransform } from './utils';

const baseInput = `
.a {
    .b {
        color: black;
    }
}
`;

describe('nested', () => {
  it('it transforms nested rules correctly', async () => {
    const res = await testTransform(baseInput);
    expect(res.css).toMatchSnapshot();
  });
});
