function defaultComparator(a, b) { return a - b; }

function getParentPosition(position) {
  if (position === 0) { return -1; }
  return Math.floor(position / 2);
}

exports.Heap = class Heap {
  #storage = [];

  #cmp = null;

  constructor(cmp = defaultComparator) {
    this.#storage = [];
    this.#cmp = cmp;
  }

  #shiftUp(position) {
    const element = this.#storage[position];
    let parentPosition = getParentPosition(position);

    while (parentPosition != -1 && this.#isLess(element, this.#storage[parentPosition])) {
      this.#storage[position] = this.#storage[parentPosition];
      position = parentPosition;
      parentPosition = getParentPosition(position);
    }

    this.#storage[position] = element;

    return position;
  }

  #shiftDown(position) {
    const targetValue = this.#storage[position];
    const storageLen = this.#storage.length;
    const leftChildPosition = position * 2 + 1;
    const rightChildPosition = position * 2 + 2;

    let minChildPosition = -1;

    if (storageLen <= leftChildPosition) {
      return;
    }

    if (storageLen > leftChildPosition && storageLen <= rightChildPosition) {
      minChildPosition = leftChildPosition;
    } else {
      const leftValue = this.#storage[leftChildPosition];
      const rightValue = this.#storage[rightChildPosition];

      minChildPosition = this.#isLess(leftValue, rightValue) ? leftChildPosition : rightChildPosition;
    }

    const minChildValue = this.#storage[minChildPosition];

    if (this.#isLess(minChildValue, targetValue)) {
      this.#storage[position] = minChildValue;
      this.#storage[minChildPosition] = targetValue;
      this.#shiftDown(minChildPosition)
    }
  }

  push(element) {
    this.#storage.push(element);
    const position = this.#shiftUp(this.#storage.length - 1);
    this.#shiftDown(position);
    return element;
  }

  pop() {
    if (this.#storage.length == 0) {
      return;
    }
    if (this.#storage.length == 1) {
      return this.#storage.pop();
    }
    const result = this.#storage[0];
    this.#storage[0] = this.#storage.pop();
    this.#shiftDown(0);

    console.log(this.dumpStorage());
    return result;
  }

  #isLess(a, b) {
    return this.#cmp(a, b) < 0;
  }

  dumpStorage() { return this.#storage }
}

const cmp = (a, b) => b - a;
const input = [10, 1, 2, 3, 4, 1, 8, 4, 3, 2, 1, 2, 9];
const heap = new exports.Heap(cmp);

input.reduce((heap, element) => { heap.push(element); return heap; }, heap);
console.log(heap.dumpStorage());

let element;
while ((element = heap.pop()) !== undefined) {
  console.log(element);
}
console.log(Array.from(input).sort(cmp));