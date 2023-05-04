const re = /light-dark\(([^,]+),([^)]+)\)/;

function getValue(index: number) {
  function extractValue(input: string): string {
    const match = input.match(re);

    if (match) {
      const value = match[index];
      const replaced = input.replace(re, value.trim());
      return extractValue(replaced);
    }

    return input;
  }

  return extractValue;
}

export const getLightValue = getValue(1);
export const getDarkValue = getValue(2);
