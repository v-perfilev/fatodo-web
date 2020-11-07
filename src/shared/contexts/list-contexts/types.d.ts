type ListState<T> = {
  objs: T[];
  setObjs: (objects: T[]) => void;
  load: () => void;
  setLoad: (loadObjects: () => void) => void;
  loading: boolean;
};
