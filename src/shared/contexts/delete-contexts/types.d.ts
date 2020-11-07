export type DeleteState<T> = {
  setObj: (object: T) => void;
  setOnSuccess: (onSuccess: () => void) => void;
};

export type DeleteDialogProps<T> = {
  obj: T;
  setObj: (object: T) => void;
  onSuccess?: () => void;
};
