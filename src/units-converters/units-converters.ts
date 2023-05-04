function createConverter(units: string) {
  return (px: unknown) => {
    if (typeof px === 'number') {
      return `${px / 16}${units}`;
    }

    if (typeof px === 'string') {
      const replaced = px.replace('px', '');
      if (!Number.isNaN(Number(replaced))) {
        return `${Number(replaced) / 16}${units}`;
      }
    }

    return px as string;
  };
}

export const rem = createConverter('rem');
export const em = createConverter('em');

export function px(value: unknown) {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    if (value.includes('px')) {
      return Number(value.replace('px', ''));
    }

    if (value.includes('rem')) {
      return Number(value.replace('rem', '')) * 16;
    }

    if (value.includes('em')) {
      return Number(value.replace('em', '')) * 16;
    }

    return Number(value);
  }

  return NaN;
}
