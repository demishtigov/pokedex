import { UserCard } from '@common';
import { useUsersCollection } from '@utils/firebase';

export const UsersPage = () => {
  const usersCollection = useUsersCollection();
  if (usersCollection.isLoading || !usersCollection.data) return null;
  const { data: users } = usersCollection;

  return (
    <div className='page'>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3'>
        {users.map((user) => (
          <UserCard key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
};
