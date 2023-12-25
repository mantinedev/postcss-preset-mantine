import { testTransform } from './utils';

const baseInput = `
.demo {
  @mixin rtl {
    margin-right: 1rem;
  }

  @mixin not-rtl {
    margin-left: 1rem;
  }
}
`;

const whereInput = `
.demo {
  @mixin where-rtl {
    margin-right: 1rem;
  }

  @mixin where-not-rtl {
    margin-left: 1rem;
  }
}
`;

describe('mixin-rtl', () => {
  it('transforms rtl mixins correctly', async () => {
    const res = await testTransform(baseInput);
    expect(res.css).toMatchSnapshot();
  });

  it('transforms where-rtl mixins correctly', async () => {
    const res = await testTransform(whereInput);
    expect(res.css).toMatchSnapshot();
  });
});
