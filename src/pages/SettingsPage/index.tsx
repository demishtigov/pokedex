import classnames from 'classnames';
import { useState } from 'react';

import { IconButton, SettingChangeModal, Spinner, UploadPhotoModal } from '@common';
import { PenIcon } from '@common/icons';
import type { SettingModalItem } from '@common/modals';
import { useAuthState } from '@utils/firebase';
import { setDefaultImage } from '@utils/helpers';

import { Setting } from './Setting';

export const SettingsPage = () => {
  const [isShowUploadPhotoModal, setIsShowUploadPhotoModal] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState<SettingModalItem | null>(null);

  const authState = useAuthState();

  if (!authState.data) return <Spinner />;
  const user = authState.data;

  const photoURL = user.photoURL!;

  return (
    <div
      className={classnames(
        'page',
        'flex flex-col items-center gap-5 md:flex-row md:justify-center'
      )}
    >
      <div className='relative flex items-center justify-center'>
        <img
          aria-hidden
          src={photoURL}
          alt='photoURL'
          onError={setDefaultImage}
          className='h-56 w-56 rounded-xl object-contain md:h-72 md:w-72'
        />
        <div className='absolute bottom-0 m-auto'>
          <IconButton
            icon={<PenIcon />}
            onClick={() => setIsShowUploadPhotoModal(!isShowUploadPhotoModal)}
          />
        </div>
      </div>
      <div className='card w-full max-w-md'>
        <ul className='mt-2 flex flex-col gap-5'>
          <li>
            <Setting label='User id' value={user.uid} />
          </li>
          {user.email && (
            <li>
              <Setting label='Email' value={user.email} />
            </li>
          )}
          {user.displayName && (
            <li>
              <Setting
                label='Your name'
                value={user.displayName}
                onClick={() => setSelectedSetting({ type: 'displayName', value: user.displayName })}
              />
            </li>
          )}
          <li>
            <Setting
              label='City'
              value={user.city ?? 'no data'}
              onClick={() => setSelectedSetting({ type: 'city', value: user.city ?? '' })}
            />
          </li>
        </ul>
      </div>
      <UploadPhotoModal
        uid={user.uid}
        isShowing={isShowUploadPhotoModal}
        onClose={() => setIsShowUploadPhotoModal(false)}
      />
      <SettingChangeModal setting={selectedSetting} onClose={() => setSelectedSetting(null)} />
    </div>
  );
};
