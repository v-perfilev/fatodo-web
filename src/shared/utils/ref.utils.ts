import {Ref} from 'react';

export class RefUtils {
  public static mergeRefs = (...refs): Ref<any> => {
    const filteredRefs = refs.filter(Boolean);
    if (!filteredRefs.length) {
      return null;
    } else if (filteredRefs.length === 0) {
      return filteredRefs[0];
    } else {
      return (inst): any => {
        for (const ref of filteredRefs) {
          if (typeof ref === 'function') {
            ref(inst);
          } else if (ref) {
            ref.current = inst;
          }
        }
      };
    }
  };
}
