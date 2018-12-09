/**
 * Gets a slice of an array wrapped around and shifted
 * @example
 *   Say we have an array from [0..20];
 *   and we want to set the root to the first image,
 *   But just because it's our root element does not mean we want
 *   it to be the first of the array.
 *   In fact, what we want is [19, 20, 0, 1, 2];
 *   So we can say that the transpose from the root is "two before" or 2;
 * @param arr {Array<any>} - the root array
 * @param root {number} - the head of the array to draw from
 * @param size {number} - the size of our sample
 * @param transpose - the transposition of the root.
 * @returns Array<any>
 */
const wrapAroundSlice = (
  arr: any[],
  root: number,
  size: number,
  transpose: number = 0
): any[] => {
  const length = arr.length;
  if (length === 0) {
    return [];
  }
  if (size > length) {
    // a quick and dirty recursive solution, just cloning/doubling the array till it gets there.
    // There are certainly more efficient algorithms, but for the actual use case here,
    // this solution is *fine*, and should never result in more than 3 recursions in practice.
    // (for an arr of one element and a size of 5.)
    return wrapAroundSlice(arr.concat(arr), root, size, transpose);
  }
  if (transpose > size) {
    throw new Error(
      `The absolute value of transpose(${transpose}) cannot be greater than size(${size})`
    );
  }
  const first = (root - transpose + length) % length;
  if (first + size < length) {
    return arr.slice(first, first + size);
  }
  const head = arr.slice(first, length);
  const tail = arr.slice(0, size - head.length);
  return head.concat(tail);
};

export default wrapAroundSlice;
