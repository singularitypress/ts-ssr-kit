/**
 * @description This was designed to convert non-array iterables like a NodeListOf or NamedNodeMap into an array
 * @returns An array, you need to cast it as the appropriate array of types though.
 */
export const convertArr = (list: any) => {
  return Array.prototype.slice.call(list);
};
