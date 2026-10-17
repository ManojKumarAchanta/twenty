import { parseArrayValues } from 'src/engine/api/rest/input-request-parsers/filter-parser-utils/parse-array-values.util';

describe('parseArrayValues', () => {
  it('should split simple comma-separated values', () => {
    expect(parseArrayValues('apple,banana,mango')).toEqual([
      'apple',
      'banana',
      'mango',
    ]);
  });

  it('should trim whitespace around values', () => {
    expect(parseArrayValues('apple , banana , mango ')).toEqual([
      'apple',
      'banana',
      'mango',
    ]);
  });

  it('should preserve commas inside double-quoted values', () => {
    expect(parseArrayValues('"john,dsf","fadsfds"')).toEqual([
      '"john,dsf"',
      '"fadsfds"',
    ]);
  });

  it('should preserve apostrophes inside double-quoted values', () => {
    expect(parseArrayValues(`"caleb's name","fadsfds"`)).toEqual([
      `"caleb's name"`,
      '"fadsfds"',
    ]);
  });

  it('should preserve double quotes inside single-quoted values', () => {
    expect(parseArrayValues(`'caleb "john"','fadsfds'`)).toEqual([
      `'caleb "john"'`,
      "'fadsfds'",
    ]);
  });

  it('should handle mixed quoted and unquoted values', () => {
    expect(parseArrayValues('apple,"john,dsf",mango')).toEqual([
      'apple',
      '"john,dsf"',
      'mango',
    ]);
  });

  it('should handle a single value without commas', () => {
    expect(parseArrayValues('apple')).toEqual(['apple']);
  });

  it('should preserve empty values between commas', () => {
    expect(parseArrayValues('apple,,mango')).toEqual(['apple', '', 'mango']);
  });

  it('should handle an empty string', () => {
    expect(parseArrayValues('')).toEqual(['']);
  });

  it('should preserve empty quoted values', () => {
    expect(parseArrayValues('"","mango"')).toEqual(['""', '"mango"']);
  });
});
