import { convertArr } from "./convert-arr";

export const attrObj = (attr: NamedNodeMap) => {
  return (convertArr(attr) as Attr[]).reduce((totalObj, currAttr) => {
    return { ...totalObj, [currAttr.name]: currAttr.value };
  }, {});
};
