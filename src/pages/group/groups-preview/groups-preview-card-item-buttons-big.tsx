import React, {FC} from 'react';
import {TooltipIconButton, TooltipIconButtonProps} from '../../../components/surfaces';

type Props = {
  menuItems: TooltipIconButtonProps[];
};

const GroupsPreviewCardItemButtonsBig: FC<Props> = ({menuItems}: Props) => {
  return (
    <>
      {menuItems.map((item, index) => (
        <TooltipIconButton
          action={item.action}
          icon={item.icon}
          text={item.text}
          loading={item.loading}
          disabled={item.disabled}
          show={item.show}
          key={index}
        />
      ))}
    </>
  );
};

export default GroupsPreviewCardItemButtonsBig;
