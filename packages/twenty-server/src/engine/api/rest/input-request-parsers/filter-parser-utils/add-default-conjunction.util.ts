import {
  Conjunctions,
  parseRootFilterConjunction,
} from 'src/engine/api/rest/input-request-parsers/filter-parser-utils/parse-filter.util';

export const DEFAULT_CONJUNCTION = Conjunctions.and;

export const addDefaultConjunctionIfMissing = (filterQuery: string): string => {
  if (!parseRootFilterConjunction(filterQuery)) {
    return `${DEFAULT_CONJUNCTION}(${filterQuery})`;
  }

  return filterQuery;
};
