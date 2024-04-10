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
});
