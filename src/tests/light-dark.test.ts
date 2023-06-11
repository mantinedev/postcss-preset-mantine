const postcss = require('postcss');
const preset = require('../preset');

const baseInput = `
.button {
  background: light-dark(var(--mantine-color-red-5), var(--mantine-color-blue-9));
}
`;

const mediaInput = `
@media screen and (min-width: 400px) {
  .button {
    background: light-dark(var(--mantine-color-green-5), var(--mantine-color-yellow-9));
  }
}
`;

const lightDarkInsideClassNameInput = `
.button-light-dark {
  color: red;
}

.button-light-dark:hover {
  color: light-dark(var(--mantine-color-red-5), var(--mantine-color-blue-9));
}
`;

const lightDarkInsideFunctionInput = `
.button {
  color: highlight-dark(red);
}
`;

const commasInput = `
.button {
  color: light-dark(rgba(0, 0, 0, 0.2), rgba(142 142 142 / 0.2));
}
`;

describe('light-dark', () => {
  it('should work', async () => {
    const res = await postcss([preset]).process(baseInput);
    expect(res.css).toMatchSnapshot();
  });

  it('works inside media query', async () => {
    const res = await postcss([preset]).process(mediaInput);
    expect(res.css).toMatchSnapshot();
  });

  it('works when light-dark is inside the class name', async () => {
    const res = await postcss([preset]).process(lightDarkInsideClassNameInput);
    expect(res.css).toMatchSnapshot();
  });

  it('doesnt process the function when name doesnt match exactly', async () => {
    const res = await postcss([preset]).process(lightDarkInsideFunctionInput);
    expect(res.css).toMatchSnapshot();
  });

  it('works when there are commas in the value', async () => {
    const res = await postcss([preset]).process(commasInput);
    expect(res.css).toMatchSnapshot();
  });
});
