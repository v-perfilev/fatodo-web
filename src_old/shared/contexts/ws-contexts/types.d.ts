type WsTopicsAndHandler = {
  topics: string[];
  handler: (msg: any, topic: string) => void;
};

export type WsState = {
  setTopicsAndHandler: (key: string, topicsAndHandler: WsTopicsAndHandler) => void;
  removeTopicsAndHandler: (key: string) => void;
};
