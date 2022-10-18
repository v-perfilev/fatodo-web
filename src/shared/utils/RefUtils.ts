import {MutableRefObject, useEffect, useRef} from 'react';
import {FilterUtils} from './FilterUtils';

type RefFunctionType = (ref: any) => void;
type RefType = MutableRefObject<any> | RefFunctionType;

export class RefUtils {
  public static merge = (...refs: RefType[]): ((node: any) => void) => {
    return (node): void =>
      refs
        .filter(FilterUtils.notUndefinedFilter)
        .filter(FilterUtils.notNullFilter)
        .forEach((ref) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        });
  };

  public static usePrevious = <T>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
}
