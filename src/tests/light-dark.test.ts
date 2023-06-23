import { testTransform } from './utils';

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
  it('works with base input', async () => {
    const res = await testTransform(baseInput);
    expect(res.css).toMatchSnapshot();
  });

  it('works inside media query', async () => {
    const res = await testTransform(mediaInput);
    expect(res.css).toMatchSnapshot();
  });

  it('works when light-dark is inside the class name', async () => {
    const res = await testTransform(lightDarkInsideClassNameInput);
    expect(res.css).toMatchSnapshot();
  });

  it('does not process the function when name does not match exactly', async () => {
    const res = await testTransform(lightDarkInsideFunctionInput);
    expect(res.css).toMatchSnapshot();
  });

  it('works when there are commas in the value', async () => {
    const res = await testTransform(commasInput);
    expect(res.css).toMatchSnapshot();
  });
});
