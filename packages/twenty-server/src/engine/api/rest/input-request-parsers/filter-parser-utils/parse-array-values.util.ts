export const parseArrayValues = (value: string): string[] => {
  let isWithinSingleQuotes = false;
  let isWithinDoubleQuotes = false;

  const result: string[] = [];
  let currentValue = '';

  for (const c of value) {
    if (c === "'" && !isWithinDoubleQuotes) {
      isWithinSingleQuotes = !isWithinSingleQuotes;
    } else if (c === '"' && !isWithinSingleQuotes) {
      isWithinDoubleQuotes = !isWithinDoubleQuotes;
    }

    if (c === ',' && !isWithinSingleQuotes && !isWithinDoubleQuotes) {
      result.push(currentValue.trim());
      currentValue = '';
    } else {
      currentValue += c;
    }
  }

  result.push(currentValue.trim());

  return result.map((item) => {
    if (
      (item.startsWith('"') && item.endsWith('"')) ||
      (item.startsWith("'") && item.endsWith("'"))
    ) {
      return item.slice(1, -1);
    }
    return item;
  });
};
