const { Heap } = require('binaryHeap.js');

describe('extraction from empty heap', () => {
  test('without comparator', () => {
    const heap = new Heap();
    expect(heap.pop()).toEqual(undefined);
  });

  test('with comparator', () => {
    const heap = new Heap((a, b) => a - b);
    expect(heap.pop()).toEqual(undefined);
  });
});

describe('regular work', () => {
  test('sorted input', () => {
    const heap = new Heap();
    heap.push(1);
    heap.push(2);
    heap.push(3);
    heap.push(4);
    heap.push(5);
    expect(heap.pop()).toEqual(1);
    expect(heap.pop()).toEqual(2);
    expect(heap.pop()).toEqual(3);
    expect(heap.pop()).toEqual(4);
    expect(heap.pop()).toEqual(5);
  });

  test('reversed input', () => {
    const heap = new Heap();
    heap.push(5);
    heap.push(4);
    heap.push(3);
    heap.push(2);
    heap.push(1);
    expect(heap.pop()).toEqual(1);
    expect(heap.pop()).toEqual(2);
    expect(heap.pop()).toEqual(3);
    expect(heap.pop()).toEqual(4);
    expect(heap.pop()).toEqual(5);
  });

  test('multielements', () => {
    const heap = new Heap();
    heap.push(1);
    heap.push(2);
    heap.push(1);
    heap.push(1);
    expect(heap.pop()).toEqual(1);
    expect(heap.pop()).toEqual(1);
    expect(heap.pop()).toEqual(1);
    expect(heap.pop()).toEqual(2);
    expect(heap.pop()).toEqual(undefined);
  });

  test('random input', () => {
    const heap = new Heap();
    const input = [10, 1, 2, 3, 4, 1, 8, 4, 3, 2, 1, 2, 9];
    const sortedInput = Array.from(input).sort();

    input.reduce((heap, element) => { heap.push(element); return heap; }, heap);

    sortedInput.forEach((element) => {
      expect(heap.pop()).toEqual(element);
    });
  });

  test('random input with comparator', () => {
    const cmp = (a, b) => b - a;

    const heap = new Heap(cmp);
    const input = [10, 1, 2, 3, 4, 1, 8, 4, 3, 2, 1, 2, 9];
    const sortedInput = Array.from(input).sort(cmp);

    input.reduce((heap, element) => { heap.push(element); return heap; }, heap);

    sortedInput.forEach((element) => {
      const extractedElement = heap.pop();
      expect(extractedElement).toEqual(element);
    });

  });
});