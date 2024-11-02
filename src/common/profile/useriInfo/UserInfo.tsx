import { FC } from 'react';
import { UserCard } from '@common';
import styles from './UserInfo.module.css';

interface UserInfoProps {
  user: User;
}

export const UserInfo: FC<UserInfoProps> = ({ user }) => (
  <div className={styles.container}>
    <UserCard user={user} />
  </div>
);
