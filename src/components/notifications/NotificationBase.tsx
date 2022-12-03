import React, {CSSProperties, memo, PropsWithChildren, Ref, useImperativeHandle} from 'react';
import {animated, useSpring} from 'react-spring';
import {HEADER_HEIGHT} from '../../constants';

type NotificationBaseProps = PropsWithChildren<{
  notificationBaseRef: Ref<NotificationBaseMethods>;
}>;

export type NotificationBaseMethods = {
  show: () => void;
  close: () => Promise<void>;
};

const NotificationBase = ({notificationBaseRef, children}: NotificationBaseProps) => {
  const [styles, api] = useSpring(() => ({opacity: 0, transform: 'translateX(150%)', config: {duration: 300}}));

  const show = () => {
    api.start({opacity: 1, transform: 'translateX(0%)'});
  };

  const close = (): Promise<void> => {
    api.start({opacity: 0, transform: 'translateX(150%)'});
    return new Promise((resolve) => setTimeout(() => resolve(), 300));
  };

  useImperativeHandle(
    notificationBaseRef,
    (): NotificationBaseMethods => ({
      show,
      close,
    }),
    [],
  );

  return <animated.div style={{...containerStyle, ...styles}}>{children}</animated.div>;
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
