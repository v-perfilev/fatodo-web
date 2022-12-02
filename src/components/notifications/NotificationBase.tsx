import React, {CSSProperties, memo, PropsWithChildren, Ref, useImperativeHandle, useState} from 'react';
import {animated, config, useTransition} from 'react-spring';
import {HEADER_HEIGHT} from '../../constants';

type NotificationBaseProps = PropsWithChildren<{
  notificationBaseRef: Ref<NotificationBaseMethods>;
}>;

export type NotificationBaseMethods = {
  show: () => void;
  close: () => Promise<void>;
};

const NotificationBase = ({notificationBaseRef, children}: NotificationBaseProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const transitions = useTransition(open, {
    from: {opacity: 0, transform: 'translateX(100%)'},
    enter: [{opacity: 1}, {transform: 'translateX(0%)'}],
    leave: [{opacity: 0}, {transform: 'translateX(100%)'}],
    config: config.default,
  });

  const show = () => {
    setOpen(true);
  };

  const close = (): Promise<void> => {
    setOpen(false);
    return new Promise((resolve) => setTimeout(() => resolve(), config.default.tension));
  };

  useImperativeHandle(
    notificationBaseRef,
    (): NotificationBaseMethods => ({
      show,
      close,
    }),
    [],
  );

  return transitions((style) => <animated.div style={{...containerStyle, ...style}}>{children}</animated.div>);
};

const containerStyle: CSSProperties = {
  position: 'fixed',
  top: `${HEADER_HEIGHT + 10}px`,
  right: `10px`,
  width: '25%',
  maxWidth: `calc(100vw - 20px)`,
  minWidth: '300px',
};

export default memo(NotificationBase);
