export type ViewState<T> = {
  obj: T;
  setObj: (object: T) => void;
  load: () => void;
  setLoad: (loadObject: () => void) => void;
  loading: boolean;
};
