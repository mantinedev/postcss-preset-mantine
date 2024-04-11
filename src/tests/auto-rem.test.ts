import { testTransform } from './utils';

const baseInput = `
.demo {
  font-size: 16px;
  height: 40px;
  padding: 10px 50px 20px 30px;
  background: red;
  border: 1px solid black;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
}
`;

const remFunctionInput = `
.demo {
  font-size: rem(16px);
  border: rem(1px) solid red;
  padding: 16px;
}
`;

const mediaInput = `
.demo {
  @media (min-width: 320px) {
    font-size: 32px;
  }
}
`;

const rgbaInput = `
.demo {
  box-shadow:
    rgba(0, 0, 0, 0.1) 0 0 0 5px inset,
    rgb(0, 0, 0, 0.15) 0 0 3px inset;
}
`;

const comaSeparatedInput = `
.demo {
  background-position: 0 0, 0 4px, 4px -4px, -4px 0;
}
`;

const unitLessInput = `
.demo {
  flex: 1 0 120px
}
`;

const contentInput = `
.demo::before {
  content: '10px';
}
`;

const urlInput = `
.demo {
  background: url('https://example.com/10px.png');
}`;

describe('auto-rem', () => {
  it('it transforms px to rem values correctly', async () => {
    const res = await testTransform(baseInput, { autoRem: true });
    expect(res.css).toMatchSnapshot();
  });

  it('it transforms input with rem function correctly', async () => {
    const res = await testTransform(remFunctionInput, { autoRem: true });
    expect(res.css).toMatchSnapshot();
  });

  it('it transforms media query correctly', async () => {
    const res = await testTransform(mediaInput, { autoRem: true });
    expect(res.css).toMatchSnapshot();
  });

  it('does not transform strings with rgba', async () => {
    const res = await testTransform(rgbaInput, { autoRem: true });
    expect(res.css).toMatchSnapshot();
  });

  it('transforms coma separated values correctly', async () => {
    const res = await testTransform(comaSeparatedInput, { autoRem: true });
    expect(res.css).toMatchSnapshot();
  });

  it('does not transform values without units', async () => {
    const res = await testTransform(unitLessInput, { autoRem: true });
    expect(res.css).toMatchSnapshot();
  });

  it('does not transform content property', async () => {
    const res = await testTransform(contentInput, { autoRem: true });
    expect(res.css).toMatchSnapshot();
  });

  it('does not transform url values', async () => {
    const res = await testTransform(urlInput, { autoRem: true });
    expect(res.css).toMatchSnapshot();
  });
});
