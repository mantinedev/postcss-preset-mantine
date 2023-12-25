import { testTransform } from './utils';

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

const whereInput = `
.demo {
  @mixin where-light {
    color: red;
  }

  @mixin where-dark {
    color: blue;
  }
}
`;

const rootInput = `
:root {
  @mixin light-root {
    color: red;
  }

  @mixin dark-root {
    color: blue;
  }
}
`;

const rootWhereInput = `
:root {
  @mixin where-light-root {
    color: red;
  }

  @mixin where-dark-root {
    color: blue;
  }
}
`;

describe('mixin-light-dark', () => {
  it('transforms light and dark mixins correctly', async () => {
    const res = await testTransform(baseInput);
    expect(res.css).toMatchSnapshot();
  });

  it('transforms where-light and where-dark mixins correctly', async () => {
    const res = await testTransform(whereInput);
    expect(res.css).toMatchSnapshot();
  });

  it('transforms light-root and dark-root mixins correctly', async () => {
    const res = await testTransform(rootInput);
    expect(res.css).toMatchSnapshot();
  });

  it('transforms where-light-root and where-dark-root mixins correctly', async () => {
    const res = await testTransform(rootWhereInput);
    expect(res.css).toMatchSnapshot();
  });
});
