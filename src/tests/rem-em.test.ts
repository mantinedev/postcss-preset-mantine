import { testTransform } from './utils';

const baseInput = `
.demo {
  font-size: rem(16px);
  height: em(40px);
}
`;

const spaceSeparatedInput = `
.demo {
  padding: rem(16px 32px);
}
`;

const spaceSeparatedWithNonPxValuesInput = `
.demo {
  border: rem(16px solid red);
}
`;

const mediaInput = `
@media (min-width: em(320px)) {
  font-size: rem(32px);
}
@media (min-height: rem(240px)) {
  font-size: em(16px);
}
`;

const remEmInsideClassNameInput = `
.button-rem {
  color: red;
}
.button-em {
  color: red;
}
`;

const remEmInsideFunctionInput = `
.button1 {
  color: theorem(32px);
}
.button2 {
  color: poem(48px);
}
`;

describe('rem-em', () => {
  it('transforms base case correctly', async () => {
    const res = await testTransform(baseInput);
    expect(res.css).toMatchSnapshot();
  });

  it('transforms space separated values correctly', async () => {
    const res = await testTransform(spaceSeparatedInput);
    expect(res.css).toMatchSnapshot();
  });

  it('works inside media query', async () => {
    const res = await testTransform(mediaInput);
    expect(res.css).toMatchSnapshot();
  });

  it('works when rem/em is inside the class name', async () => {
    const res = await testTransform(remEmInsideClassNameInput);
    expect(res.css).toMatchSnapshot();
  });

  it('does not process the function when name does not match exactly', async () => {
    const res = await testTransform(remEmInsideFunctionInput);
    expect(res.css).toMatchSnapshot();
  });

  it('works with space separated values with non-px values', async () => {
    const res = await testTransform(spaceSeparatedWithNonPxValuesInput);
    expect(res.css).toMatchSnapshot();
  });
});
