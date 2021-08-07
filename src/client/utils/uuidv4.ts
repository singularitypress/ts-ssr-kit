/**
 * @description An insecure means to generate element ids; found on stackoverflow here:
 * https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
 * @returns {string} A non-secure string; should only be used for element ids.
 */
export const uuidv4 = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
