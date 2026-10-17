export const parseRootFilterConjunction = (
  filterQuery: string,
): Conjunctions | undefined => {
  const conjunctionMatch = filterQuery.match(
    new RegExp(`^(${Object.values(Conjunctions).join('|')})\\(`),
  );

  if (!conjunctionMatch?.[1]) {
    return undefined;
  }

  let parenthesisDepth = 0;
  let isWithinDoubleQuotes = false;
  let isWithinSingleQuotes = false;

  for (
    let index = conjunctionMatch[0].length - 1;
    index < filterQuery.length;
    index++
  ) {
    const character = filterQuery[index];

    if (character === '"' && !isWithinSingleQuotes) {
      isWithinDoubleQuotes = !isWithinDoubleQuotes;
      continue;
    }

    if (character === "'" && !isWithinDoubleQuotes) {
      isWithinSingleQuotes = !isWithinSingleQuotes;
      continue;
    }

    if (isWithinDoubleQuotes || isWithinSingleQuotes) {
      continue;
    }

    if (character === '(') {
      parenthesisDepth++;
    } else if (character === ')') {
      parenthesisDepth--;

      if (parenthesisDepth === 0) {
        if (
          index !== filterQuery.length - 1 ||
          index === conjunctionMatch[0].length
        ) {
          return undefined;
        }

        return Object.values(Conjunctions).find(
          (value) => value === conjunctionMatch[1],
        );
      }
    }
  }

  return undefined;
};
