const { testTransform } = require('./utils');

const baseInput = `
.demo {
  @mixin light {
    color: red;
  }

  @mixin dark {
    color: blue;
  }
}
`;

describe('mixin-light-dark', () => {
  it('transforms light and dark mixins correctly', async () => {
    const res = await testTransform(baseInput);
    expect(res.css).toMatchSnapshot();
  });
});
