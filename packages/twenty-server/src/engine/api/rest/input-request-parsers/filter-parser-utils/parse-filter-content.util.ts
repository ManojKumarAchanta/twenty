export const parseFilterContent = (filterQuery: string): string[] => {
  let isWithinBrackets = false;
  let isWithinDoubleQuotes = false;
  let isWithinSingleQuotes = false;
  let parenthesisCounter = 0;
  const predicates: string[] = [];
  let currentPredicates = '';

  for (const c of filterQuery) {
    if (c === '"' && !isWithinSingleQuotes) {
      isWithinDoubleQuotes = !isWithinDoubleQuotes;
    } else if (c === "'" && !isWithinDoubleQuotes) {
      isWithinSingleQuotes = !isWithinSingleQuotes;
    }

    if (isWithinDoubleQuotes || isWithinSingleQuotes) {
      if (parenthesisCounter >= 1) currentPredicates += c;
      continue;
    }

    if (c === '(') {
      parenthesisCounter++;
      if (parenthesisCounter >= 2) currentPredicates += c;
      continue;
    }

    if (c === ')') {
      parenthesisCounter--;
      if (parenthesisCounter >= 1) currentPredicates += c;
      continue;
    }

    if (['[', ']'].includes(c)) isWithinBrackets = !isWithinBrackets;

    if (
      c === ',' &&
      parenthesisCounter === 1 &&
      !isWithinBrackets &&
      !isWithinDoubleQuotes &&
      !isWithinSingleQuotes
    ) {
      predicates.push(currentPredicates);
      currentPredicates = '';
    }

    if (parenthesisCounter >= 1) currentPredicates += c;
  }

  predicates.push(currentPredicates);

  return predicates;
};
