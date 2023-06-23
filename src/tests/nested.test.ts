const { testTransform } = require('./utils');

const baseInput = `
.a {
    .b {
        color: black;
    }
}
`;

// We don't have to test all functionality of postcss-nested, just that it's included
describe('nested', () => {
  it('should work', async () => {
    const res = await testTransform(baseInput);
    expect(res.css).toMatchSnapshot();
  });
});
