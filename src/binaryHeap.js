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
    this.#shiftUp(this.#storage.length - 1);
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
    return result;
  }

  #isLess(a, b) {
    return this.#cmp(a, b) < 0;
  }
}
