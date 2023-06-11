const { testTransform } = require('./utils');

const baseInput = `
.demo {
  font-size: rem(16px);
  height: em(40px);
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
  it('should work', async () => {
    const res = await testTransform(baseInput);
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

  it('doesnt process the function when name doesnt match exactly', async () => {
    const res = await testTransform(remEmInsideFunctionInput);
    expect(res.css).toMatchSnapshot();
  });
});
