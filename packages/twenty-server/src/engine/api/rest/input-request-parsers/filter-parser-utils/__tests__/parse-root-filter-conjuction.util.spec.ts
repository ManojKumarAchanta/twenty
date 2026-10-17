import { parseRootFilterConjunction } from 'src/engine/api/rest/input-request-parsers/filter-parser-utils/parse-root-filter-conjunction.util';
import { Conjunctions } from 'src/engine/api/rest/input-request-parsers/filter-parser-utils/conjunctions.enum';

describe('parseRootFilterConjunction', () => {
  describe('valid conjunctions', () => {
    it('should parse an AND conjunction', () => {
      expect(parseRootFilterConjunction('and(field1:eq:1,field2:eq:2)')).toBe(
        Conjunctions.and,
      );
    });

    it('should parse an OR conjunction', () => {
      expect(parseRootFilterConjunction('or(field1:eq:1,field2:eq:2)')).toBe(
        Conjunctions.or,
      );
    });

    it('should parse a conjunction containing a nested conjunction', () => {
      expect(
        parseRootFilterConjunction(
          'and(field1:eq:1,or(field2:eq:2,field3:eq:3))',
        ),
      ).toBe(Conjunctions.and);
    });

    it('should parse a conjunction containing nested parentheses', () => {
      expect(
        parseRootFilterConjunction('and(field1:eq:1,nested(field2:eq:2))'),
      ).toBe(Conjunctions.and);
    });

    it('should parse a conjunction containing commas inside double quotes', () => {
      expect(
        parseRootFilterConjunction('and(name:eq:"john,doe",age:eq:25)'),
      ).toBe(Conjunctions.and);
    });

    it('should parse a conjunction containing apostrophes inside double quotes', () => {
      expect(
        parseRootFilterConjunction(`and(name:eq:"john's name",age:eq:25)`),
      ).toBe(Conjunctions.and);
    });

    it('should parse a conjunction containing double quotes inside single quotes', () => {
      expect(
        parseRootFilterConjunction(`and(name:eq:'john "the dev"',age:eq:25)`),
      ).toBe(Conjunctions.and);
    });
  });

  describe('invalid conjunctions', () => {
    it('should return undefined for a filter without a root conjunction', () => {
      expect(parseRootFilterConjunction('field1:eq:1')).toBeUndefined();
    });

    it('should return undefined for an unknown conjunction', () => {
      expect(
        parseRootFilterConjunction('xor(field1:eq:1,field2:eq:2)'),
      ).toBeUndefined();
    });

    it('should return undefined when the opening parenthesis is missing', () => {
      expect(
        parseRootFilterConjunction('and field1:eq:1,field2:eq:2)'),
      ).toBeUndefined();
    });

    it('should return undefined when the closing parenthesis is missing', () => {
      expect(
        parseRootFilterConjunction('and(field1:eq:1,field2:eq:2'),
      ).toBeUndefined();
    });

    it('should return undefined when there are trailing characters', () => {
      expect(
        parseRootFilterConjunction('and(field1:eq:1) extra'),
      ).toBeUndefined();
    });

    it('should return undefined when there are trailing parentheses', () => {
      expect(parseRootFilterConjunction('and(field1:eq:1))')).toBeUndefined();
    });

    it('should return undefined when the root conjunction is empty', () => {
      expect(parseRootFilterConjunction('and()')).toBe(Conjunctions.and);
    });

    it('should return undefined for an unclosed quoted string', () => {
      expect(
        parseRootFilterConjunction('and(name:eq:"john,doe)'),
      ).toBeUndefined();
    });
  });
});
