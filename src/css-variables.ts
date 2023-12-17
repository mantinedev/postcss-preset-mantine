export const CSS_VARIABLES: Record<string, string> = {
  scale: 'var(--mantine-scale)',
  'cursor-type': 'var(--mantine-cursor-type)',
  'webkit-font-smoothing': 'var(--mantine-webkit-font-smoothing)',
  'moz-font-smoothing': 'var(--mantine-moz-font-smoothing)',
  'color-scheme': 'var(--mantine-color-scheme)',
  white: 'var(--mantine-color-white)',
  black: 'var(--mantine-color-black)',
  'line-height': 'var(--mantine-line-height)',
  'font-family': 'var(--mantine-font-family)',
  'font-family-monospace': 'var(--mantine-font-family-monospace)',
  'font-family-headings': 'var(--mantine-font-family-headings)',
  ff: 'var(--mantine-font-family)',
  'ff-monospace': 'var(--mantine-font-family-monospace)',
  'ff-headings': 'var(--mantine-font-family-headings)',
  'heading-font-weight': 'var(--mantine-heading-font-weight)',
  'radius-default': 'var(--mantine-radius-default)',
  'primary-color-filled': 'var(--mantine-primary-color-filled)',
  'primary-color-filled-hover': 'var(--mantine-primary-color-filled-hover)',
  'primary-color-light': 'var(--mantine-primary-color-light)',
  'primary-color-light-hover': 'var(--mantine-primary-color-light-hover)',
  'primary-color-light-color': 'var(--mantine-primary-color-light-color)',
  'primary-color-0': 'var(--mantine-primary-color-0)',
  'primary-color-1': 'var(--mantine-primary-color-1)',
  'primary-color-2': 'var(--mantine-primary-color-2)',
  'primary-color-3': 'var(--mantine-primary-color-3)',
  'primary-color-4': 'var(--mantine-primary-color-4)',
  'primary-color-5': 'var(--mantine-primary-color-5)',
  'primary-color-6': 'var(--mantine-primary-color-6)',
  'primary-color-7': 'var(--mantine-primary-color-7)',
  'primary-color-8': 'var(--mantine-primary-color-8)',
  'primary-color-9': 'var(--mantine-primary-color-9)',
  'h1-font-size': 'var(--mantine-h1-font-size)',
  'h1-fz': 'var(--mantine-h1-font-size)',
  'h1-line-height': 'var(--mantine-h1-line-height)',
  'h1-lh': 'var(--mantine-h1-line-height)',
  'h2-font-size': 'var(--mantine-h2-font-size)',
  'h2-fz': 'var(--mantine-h2-font-size)',
  'h2-line-height': 'var(--mantine-h2-line-height)',
  'h2-lh': 'var(--mantine-h2-line-height)',
  'h3-font-size': 'var(--mantine-h3-font-size)',
  'h3-fz': 'var(--mantine-h3-font-size)',
  'h3-line-height': 'var(--mantine-h3-line-height)',
  'h3-lh': 'var(--mantine-h3-line-height)',
  'h4-font-size': 'var(--mantine-h4-font-size)',
  'h4-fz': 'var(--mantine-h4-font-size)',
  'h4-line-height': 'var(--mantine-h4-line-height)',
  'h4-lh': 'var(--mantine-h4-line-height)',
  'h5-font-size': 'var(--mantine-h5-font-size)',
  'h5-fz': 'var(--mantine-h5-font-size)',
  'h5-line-height': 'var(--mantine-h5-line-height)',
  'h5-lh': 'var(--mantine-h5-line-height)',
  'h6-font-size': 'var(--mantine-h6-font-size)',
  'h6-fz': 'var(--mantine-h6-font-size)',
  'h6-line-height': 'var(--mantine-h6-line-height)',
  'h6-lh': 'var(--mantine-h6-line-height)',
};

module.exports = function getVariable(input: string) {
  const normalizedInput = input.trim().toLowerCase();

  if (CSS_VARIABLES[normalizedInput]) {
    return CSS_VARIABLES[normalizedInput];
  }

  if (normalizedInput.startsWith('spacing-')) {
    return `var(--mantine-spacing-${normalizedInput.replace('spacing-', '')})`;
  }

  if (normalizedInput.startsWith('font-size-') || normalizedInput.startsWith('fz-')) {
    return `var(--mantine-font-size-${normalizedInput
      .replace('font-size-', '')
      .replace('fz-', '')})`;
  }

  if (normalizedInput.startsWith('breakpoint-')) {
    return `var(--mantine-breakpoint-${normalizedInput.replace('breakpoint-', '')})`;
  }

  if (normalizedInput.startsWith('shadow-')) {
    return `var(--mantine-shadow-${normalizedInput.replace('shadow-', '')})`;
  }

  if (normalizedInput.startsWith('line-height-') || normalizedInput.startsWith('lh-')) {
    return `var(--mantine-line-height-${normalizedInput
      .replace('line-height-', '')
      .replace('lh-', '')})`;
  }

  if (normalizedInput.startsWith('radius-')) {
    return `var(--mantine-radius-${normalizedInput.replace('radius-', '')})`;
  }

  if (normalizedInput.startsWith('color-')) {
    return `var(--mantine-color-${normalizedInput.replace('color-', '')})`;
  }

  return input;
};
