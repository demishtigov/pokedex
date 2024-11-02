import { FC } from 'react';

import { IconButton, Typography } from '@common';
import { ArrowRigthIcon } from '@common/icons';

interface SettingProps {
  label: string;
  value: string;
  onClick?: () => void;
}

export const Setting: FC<SettingProps> = ({ label, value, onClick }) => (
  <div className='flex justify-between'>
    <div>
      <Typography variant='sub-body'>{label}</Typography>
      <Typography variant='title-body'>{value}</Typography>
    </div>
    {onClick && <IconButton variant='icon' icon={<ArrowRigthIcon />} onClick={onClick} />}
  </div>
);
