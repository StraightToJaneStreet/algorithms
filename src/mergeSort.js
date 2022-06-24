exports.mergeSort = mergeSort;

function defaultComparator(a, b) {
  return a - b;
}

function merge(leftPart, rightPart, cmp) {
  const result = [];
  const steppers = {
    left: { iteration: null, iterator: leftPart[Symbol.iterator]() },
    right: { iteration: null, iterator: rightPart[Symbol.iterator]() }
  }

  steppers.left.iteration = steppers.left.iterator.next();
  steppers.right.iteration = steppers.right.iterator.next();

  let selectedStepper;

  while (!steppers.left.iteration.done && !steppers.right.iteration.done) {
    if (cmp(steppers.left.iteration.value, steppers.right.iteration.value) > 0) {
      selectedStepper = steppers.right;
    } else {
      selectedStepper = steppers.left;
    }
    result.push(selectedStepper.iteration.value);
    selectedStepper.iteration = selectedStepper.iterator.next();
  }

  selectedStepper = (!steppers.left.iteration.done) ? steppers.left : steppers.right;

  while (!selectedStepper.iteration.done) {
    result.push(selectedStepper.iteration.value);
    selectedStepper.iteration = selectedStepper.iterator.next();
  }

  return result;
}

function mergeSortInternal(arr, cmp) {
  if (arr.length < 2) {
    return arr;
  }

  const median = Math.floor(arr.length / 2);

  const leftPart = mergeSortInternal(arr.splice(0, median), cmp);
  const rightPart = mergeSortInternal(arr, cmp);

  return merge(leftPart, rightPart, cmp);
}

function mergeSort(arr, cmp = defaultComparator) {
  const arrCopy = Array.from(arr);
  return mergeSortInternal(arrCopy, cmp);
}
