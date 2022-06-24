const { mergeSort } = require('mergeSort.js');
describe('empty arrays', () => {
  test('empty array', () => {
    const source = [];
    const sorted = mergeSort(source);

    expect(source).toEqual([]);
    expect(sorted).toEqual(source);
  });
});

describe('single item array', () => {
  test('single primitive', () => {
    const source = [10];
    const sorted = mergeSort(source);

    expect(source).toEqual([10]);
    expect(sorted).toEqual(source);
  });

  test('single object', () => {
    const obj = {};
    const source = [obj];
    const sorted = mergeSort(source);

    expect(source).toEqual([obj]);
    expect(sorted).toEqual(source);
  });
});

describe('regular arrays', () => {
  test('sorted primitives', () => {
    const source = [1, 2, 3, 4, 5];
    const sorted = mergeSort(source);

    expect(source).toEqual([1, 2, 3, 4, 5]);
    expect(sorted).toEqual(source);
  });

  test('any order', () => {
    const source = [2, 1, 4, 2, 3, 5];

    const sorted = mergeSort(source);
    const sortedCopy = Array.from(source).sort();

    expect(sortedCopy).toEqual(sorted);
  });
});

describe('custom comparator', () => {
  test('even>odd sorting', () => {
    const comparator = (a, b) => {
      const isAEven = a % 2 == 0, isBEven = b % 2 == 0;

      if (isAEven && !isBEven) {
        return -1;
      }

      if (!isAEven && isBEven) {
        return 1;
      }

      return a - b;
    }

    const source = [1, 2, 3, 4, 5, 6, 7, 8];
    const sorted = mergeSort(source, comparator);

    expect(sorted).toEqual([2, 4, 6, 8, 1, 3, 5, 7]);
  });
});
